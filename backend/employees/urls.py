from . import api_views
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .api_views import (
    EmployeeViewSet,
    LeadViewSet,
    WorksViewSet,
    AssignedWorkViewSet,
    register_user
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'works', WorksViewSet, basename='work')
router.register(r'assigned', AssignedWorkViewSet, basename='assignedwork')

urlpatterns = [
    path('register/', register_user, name='register_user'),
    path('assigned/<int:pk>/complete/', api_views.mark_completed_api),
    path('assigned/<int:pk>/delete/', api_views.delete_assigned_api),
    path('', include(router.urls)),
]
