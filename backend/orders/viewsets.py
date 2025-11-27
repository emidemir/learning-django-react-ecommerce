from rest_framework import viewsets

from .models import Cart, CartItem, Order, OrderItem, ShippingAddress

class CartViewset(viewsets.ModelViewSet):
    pass

class CartItemViewset(viewsets.ModelViewSet):
    pass

class OrderViewset(viewsets.ModelViewSet):
    pass

class OrderItemViewset(viewsets.ModelViewSet):
    pass

class ShippingAddressViewset(viewsets.ModelViewSet):
    pass