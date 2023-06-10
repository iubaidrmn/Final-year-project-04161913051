from rest_framework import serializers 
from .models import User
 
 
class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('fullname', 'username', 'email', 'passowrd', 'contact_no', 'role_id')