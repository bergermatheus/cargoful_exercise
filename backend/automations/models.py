from django.db import models
from django.utils import timezone


class Automation(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
    ]

    name = models.CharField(max_length=200)
    schedule = models.CharField(max_length=200)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    repetition = models.CharField(max_length=50, default='Daily')
    start_date = models.DateTimeField()
    last_run = models.DateTimeField(null=True, blank=True)
    last_run_status = models.CharField(max_length=20, null=True, blank=True)
    next_run = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

