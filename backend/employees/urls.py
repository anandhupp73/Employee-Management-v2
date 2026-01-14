from rest_framework.routers import DefaultRouter
from .api_views import (
    EmployeeViewSet,
    LeadViewSet,
    WorksViewSet,
    AssignedWorkViewSet
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'leads', LeadViewSet)
router.register(r'works', WorksViewSet)
router.register(r'assigned', AssignedWorkViewSet)

urlpatterns = router.urls
