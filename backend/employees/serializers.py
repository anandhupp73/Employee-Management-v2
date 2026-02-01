from rest_framework import serializers
from .models import Lead, Employee, Works, AssignedWork


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    profile_photo = serializers.ImageField(required=False)

    class Meta:
        model = Employee
        fields = '__all__'


class WorksSerializer(serializers.ModelSerializer):
    lead = LeadSerializer(read_only=True) 
    
    lead_id = serializers.PrimaryKeyRelatedField(
        queryset=Lead.objects.all(), 
        source='lead', 
        write_only=True, 
        required=False,
        allow_null=True 
    )
    
    class Meta:
        model = Works
        fields = ['work_id', 'work_name', 'description', 'lead', 'lead_id', 'created_at']

class AssignedWorkSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source='employee.emp_name',
        read_only=True
    )
    work_name = serializers.CharField(
        source='work.work_name',
        read_only=True
    )

    class Meta:
        model = AssignedWork
        fields = '__all__'
