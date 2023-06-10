from django.db import models

# Create your models here.
class User(models.Model):
    fullname = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=255)
    role_id = models.CharField(max_length=255)
    created_at = models.DateTimeField()

    class Meta:
        db_table = 'users'

class Role(models.Model):
    role_id = models.CharField(max_length=2)
    role = models.CharField(max_length=30)
    status = models.CharField(max_length=2)

    class Meta:
        db_table = 'roles'