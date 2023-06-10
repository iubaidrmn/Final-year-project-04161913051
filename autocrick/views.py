from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *

@api_view(['GET'])
def user_list(request):
    try:
        users = User.objects.all().values()
        return Response({'users': list(users)})
    except:
        return Response({'error': 'Can Not Retrieve User List'}, status=400)

@api_view(['GET'])
def roles_list(request):
    try:
        roles = Role.objects.all().values()
        return Response({'roles': list(roles)})
    except:
        return Response({'error': 'Can Not Retrieve Roles List'}, status=400)

@api_view(['POST'])
def login(request):
    # Extract username and password from request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Perform authentication logic here
    try:
        # Retrieve the user based on the provided username
        user = User.objects.get(username=username)
        # Check if the password matches
        if user.password == password:
            # Credentials are valid, perform any necessary actions
            return Response({'message': 'Login successful', 'user': list(user)}, status=200)
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    except User.DoesNotExist:
        return Response({'error': 'User not found!'}, status=400)

@api_view(['POST'])
def signup(request):
    # Extract data from request
    fullname = request.data.get('fullname')
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    contact_no = request.data.get('contact_no')
    role_id = request.data.get('role_id')
    created_at = request.data.get('created_at')
    try:
        # Check if the username or email already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=400)
        # Create a new user
        user = User(
            fullname=fullname,
            username=username,
            email=email,
            password=password,
            contact_no=contact_no,
            role_id=role_id,
            created_at=created_at
        )
        # Save the user to the database
        user.save()
        return Response({'message': 'Signup successful'}, status=200)
    except:
        return Response({'error': 'Invalid request method'}, status=400)
