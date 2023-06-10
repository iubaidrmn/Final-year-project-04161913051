from django.contrib import admin
from django.urls import path
from autocrick.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', user_list, name='api_user_list'),
    path('api/roles/', roles_list, name='api_roles_list'),
    path('api/login',  login, name='login'),
    path('api/signup', signup, name='signup'),
]
