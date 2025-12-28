from django.urls import path
from .views import SendOTP, VerifyOTP, UserProfileView, UserAddressView

urlpatterns = [
    path("send-otp/", SendOTP.as_view(), name="send-otp"),
    path("verify-otp/", VerifyOTP.as_view(), name="verify-otp"),
    path("profile/", UserProfileView.as_view()),
    path("addresses/", UserAddressView.as_view()),
    path("addresses/<int:pk>/", UserAddressView.as_view()),
]
