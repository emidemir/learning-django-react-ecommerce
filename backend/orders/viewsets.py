from rest_framework import viewsets

from .models import Cart, CartItem, Order, OrderItem, ShippingAddress
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer, ShippingAddressSerializer

class CartViewset(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartItemViewset(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class OrderViewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewset(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class ShippingAddressViewset(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer