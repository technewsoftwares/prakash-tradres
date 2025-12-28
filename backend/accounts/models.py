from django.db import models
from django.contrib.auth.models import User

class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.otp}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=10, blank=True)
    first_name = models.CharField(max_length=50, blank=True)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)

    gender = models.CharField(max_length=30, blank=True)
    mobile = models.CharField(max_length=20, blank=True)

    dob = models.DateField(null=True, blank=True)
    anniversary = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.email

class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="addresses")

    full_name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    pincode = models.CharField(max_length=10)

    address = models.TextField()
    landmark = models.CharField(max_length=100, blank=True)
    locality = models.CharField(max_length=100)

    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    address_type = models.CharField(
        max_length=10,
        choices=[("home", "Home"), ("work", "Work"), ("other", "Other")]
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.city}"