import random
from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

from .models import OTP


class SendOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"success": False, "message": "Email is required"})

        otp = str(random.randint(100000, 999999))

        OTP.objects.create(email=email, otp=otp)

        send_mail(
            subject="Your Login OTP - Prakash Traders",
            message=f"Your OTP is {otp}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({
            "success": True,
            "message": "OTP sent successfully"
        })


class VerifyOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response({
                "success": False,
                "message": "Email and OTP are required"
            })

        record = OTP.objects.filter(email=email, otp=otp).last()

        if not record:
            return Response({
                "success": False,
                "message": "Invalid OTP"
            })

        user, created = User.objects.get_or_create(
            username=email,
            defaults={"email": email}
        )

        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "email": user.email,
                "username": user.username,
            }
        })