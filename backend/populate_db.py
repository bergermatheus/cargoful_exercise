import os
import django
from datetime import datetime, timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'automation_monitor.settings')
django.setup()

from automations.models import Automation

def populate_database():
    Automation.objects.all().delete()
    
    now = timezone.now()
    today = now.date()
    yesterday = today - timedelta(days=1)
    
    backup_time = now.replace(hour=23, minute=0, second=0, microsecond=0)
    if backup_time > now:
        backup_time = backup_time - timedelta(days=1)
    
    sync_time = now.replace(hour=0, minute=0, second=0, microsecond=0)
    if sync_time > now:
        sync_time = sync_time - timedelta(days=1)
    
    email_time = now.replace(hour=9, minute=0, second=0, microsecond=0)
    if email_time > now:
        email_time = email_time - timedelta(days=1)
    
    automations_data = [
        {
            'name': 'Backup Database',
            'schedule': 'Daily at 23:00',
            'status': 'ACTIVE',
            'repetition': 'Daily',
            'start_date': backup_time - timedelta(days=1),
            'last_run': backup_time - timedelta(days=1),
            'last_run_status': 'Success',
            'next_run': backup_time + timedelta(days=1),
        },
        {
            'name': 'Daily Data Sync',
            'schedule': 'Daily at 00:00',
            'status': 'ACTIVE',
            'repetition': 'Daily',
            'start_date': sync_time - timedelta(days=1),
            'last_run': sync_time - timedelta(days=1),
            'last_run_status': 'Success',
            'next_run': sync_time + timedelta(days=1),
        },
        {
            'name': 'Email newsletter',
            'schedule': 'Daily at 09:00',
            'status': 'ACTIVE',
            'repetition': 'Daily',
            'start_date': email_time - timedelta(days=1),
            'last_run': email_time - timedelta(days=1),
            'last_run_status': 'Success',
            'next_run': email_time + timedelta(days=1),
        },
        {
            'name': 'Weekly Report',
            'schedule': 'Every Monday at 09:00',
            'status': 'ACTIVE',
            'repetition': 'Weekly',
            'start_date': email_time - timedelta(days=1),
            'last_run': email_time - timedelta(days=1),
            'last_run_status': 'Failed',
            'next_run': email_time + timedelta(days=6),
        },
        {
            'name': 'Customer Survey',
            'schedule': 'Every 16 of the month at 12:00',
            'status': 'INACTIVE',
            'repetition': 'Monthly',
            'start_date': now.replace(day=16, hour=12, minute=0, second=0, microsecond=0) - timedelta(days=30),
            'last_run': None,
            'last_run_status': None,
            'next_run': None,
        },
    ]
    
    for data in automations_data:
        Automation.objects.create(**data)
    
    print(f"Created {len(automations_data)} automations")

if __name__ == '__main__':
    populate_database()

