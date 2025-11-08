from django.contrib import admin
from .models import Automation


@admin.register(Automation)
class AutomationAdmin(admin.ModelAdmin):
    list_display = ['name', 'schedule', 'status', 'last_run', 'next_run']
    list_filter = ['status', 'last_run_status']
    search_fields = ['name', 'schedule']

