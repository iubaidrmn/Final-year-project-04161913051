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
        userInfo = {
            'fullname': user.fullname,
            'username': user.username,
            'role_id': user.role_id,
        }
        # Check if the password matches
        if user.password == password:
            # Credentials are valid, perform any necessary actions
            return Response({'response': True, 'message': 'Login successful', 'user': userInfo}, status=200)
        else:
            return Response({'response': False, 'error': 'Invalid Credentials'})
    except User.DoesNotExist:
        return Response({'response': False, 'error': 'User not found!'})

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
        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({'response': False, 'error': 'Username already exists'}, status=400)
        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response({'response': False, 'error': 'Email already exists'}, status=400)
        # Create a new user
        user = User(fullname=fullname, username=username, email=email, password=password,
            contact_no=contact_no, role_id=role_id, created_at=created_at,)
        # Save the user to the database
        user.save()
        return Response({'response': True, 'message': 'Signup successful'}, status=200)
    except Exception as e:
        return Response({'response': False, 'error': 'Username / Email Exisit. Try Again!'})


