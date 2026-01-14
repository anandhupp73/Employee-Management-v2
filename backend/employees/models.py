from django.db import models

class Lead(models.Model):
    lead_id = models.AutoField(primary_key=True)
    lead_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.lead_name


class Works(models.Model):
    work_id = models.AutoField(primary_key=True)
    work_name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    lead = models.ForeignKey(
        Lead,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='works'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.work_name


class Employee(models.Model):
    emp_id = models.AutoField(primary_key=True)
    emp_name = models.CharField(max_length=100)
    emp_mob = models.CharField(max_length=15)
    emp_salary = models.IntegerField()
    department = models.CharField(max_length=100, blank=True, null=True)
    lead = models.ForeignKey(
        Lead,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employees'
    )
    profile_photo = models.ImageField(
        upload_to='employee_photos/',
        null=True,
        blank=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.emp_name


class AssignedWork(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='assignments'
    )
    work = models.ForeignKey(
        Works,
        on_delete=models.CASCADE,
        related_name='assignments'
    )
    assigned_date = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.work.work_name} → {self.employee.emp_name}'
