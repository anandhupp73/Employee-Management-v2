from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Lead, Employee, Works, AssignedWork
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes

# employees/api_views.py

class LeadViewSet(ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Lead.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorksViewSet(ModelViewSet):
    serializer_class = WorksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Works.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EmployeeViewSet(ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Employee.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AssignedWorkViewSet(ModelViewSet):
    serializer_class = AssignedWorkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AssignedWork.objects.filter(employee__user=self.request.user)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('uname')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, 
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, 
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PATCH'])
def mark_completed_api(request, pk):
    try:
        assign = AssignedWork.objects.get(pk=pk)
        assign.is_completed = True
        assign.save()
        return Response({"message": "Marked as completed"})
    except AssignedWork.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def delete_assigned_api(request, pk):
    try:
        assign = AssignedWork.objects.get(pk=pk)
        assign.delete()
        return Response({"message": "Deleted"})
    except AssignedWork.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)