from rest_framework import serializers 
from .models import User
 
 
class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('_id', 'fullname', 'username', 'email', 'password', 'contact_no', 'role_id')