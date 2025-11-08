from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta, date
from .models import Automation
from .serializers import AutomationSerializer


class AutomationViewSet(viewsets.ModelViewSet):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

    @action(detail=False, methods=["get"])
    def stats(self, request):
        total = Automation.objects.count()
        active = Automation.objects.filter(status="ACTIVE").count()

        successful_runs = Automation.objects.filter(
            last_run_status="Success"
        ).count()
        total_runs = Automation.objects.exclude(last_run__isnull=True).count()
        success_rate = (
            int((successful_runs / total_runs * 100)) if total_runs > 0 else 0
        )

        return Response(
            {"total": total, "active": active, "success_rate": success_rate}
        )

    @action(detail=False, methods=["get"])
    def today_schedule(self, request):
        today = timezone.now().date()
        automations = Automation.objects.filter(status="ACTIVE")

        result = []
        for automation in automations:
            next_run = automation.next_run
            if next_run:
                if timezone.is_aware(next_run):
                    next_run_utc = timezone.make_naive(next_run, timezone.utc)
                else:
                    next_run_utc = next_run

                next_run_date = (
                    next_run_utc.date()
                    if isinstance(next_run_utc, datetime)
                    else next_run_utc
                )

                if next_run_date == today:
                    if isinstance(next_run_utc, datetime):
                        time_str = next_run_utc.strftime("%H:%M")
                    else:
                        time_str = (
                            str(next_run_utc)[:5]
                            if len(str(next_run_utc)) >= 5
                            else "00:00"
                        )
                    result.append(
                        {
                            "id": automation.id,
                            "name": automation.name,
                            "time": time_str,
                        }
                    )

        return Response(result)

    @action(detail=False, methods=["get"])
    def yesterday_runs(self, request):
        yesterday = timezone.now().date() - timedelta(days=1)
        automations = Automation.objects.filter(last_run__date=yesterday)

        result = []
        for automation in automations:
            result.append(
                {
                    "id": automation.id,
                    "name": automation.name,
                    "status": automation.last_run_status or "Unknown",
                }
            )

        return Response(result)
