from django.urls import include, path

from .views import UserListView, UserViewSet

urlpatterns = [
    path('', UserViewSet.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    path('all', UserListView.as_view())
]
