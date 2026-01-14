from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Lead, Employee, Works, AssignedWork
from .serializers import *


class LeadViewSet(ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.filter(is_active=True)
    serializer_class = EmployeeSerializer


class WorksViewSet(ModelViewSet):
    queryset = Works.objects.all()
    serializer_class = WorksSerializer


class AssignedWorkViewSet(ModelViewSet):
    queryset = AssignedWork.objects.all()
    serializer_class = AssignedWorkSerializer
