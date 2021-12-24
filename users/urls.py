from django.urls import include, path

from .views import   CustomUserDetailAPIView, CustomUserSettingsAPIView, DriverTripsAPIView, TravellerTripsAPIView,  TripDetailAPIView, TripViewSet, UserViewSet

urlpatterns = [
    path('', UserViewSet.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    #path('all', UserListView.as_view())
    path('<int:pk>',CustomUserDetailAPIView.as_view(), name='user-information'),
    path('setting/<int:pk>',CustomUserSettingsAPIView.as_view(), name='user-information1'),
    path('create-trip',TripViewSet.as_view(), name='trip-create'),
    path('delete-trip/<int:pk>',TripDetailAPIView.as_view(), name='kitap-bilgileri1' ),
    path('trips/traveller/<int:travellerId>',TravellerTripsAPIView.as_view(), name='traveller-trips' ),
    path('trips/driver/<int:driverId>',DriverTripsAPIView.as_view(), name='driver-trips' ),
]
