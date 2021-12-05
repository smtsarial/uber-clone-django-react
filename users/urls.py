from django.urls import include, path

from .views import   CustomUserDetailAPIView, UserViewSet

urlpatterns = [
    path('', UserViewSet.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    #path('all', UserListView.as_view())
    path('<int:pk>',CustomUserDetailAPIView.as_view(), name='kitap-bilgileri' ),
]
