from rest_framework import serializers

from .models import Cart, CartItem, Order, OrderItem, ShippingAddress

class CartSerializer(serializers.ModelSerializer):
    pass

class CartItemSerializer(serializers.ModelSerializer):
    pass

class OrderSerializer(serializers.ModelSerializer):
    pass

class OrderItemSerializer(serializers.ModelSerializer):
    pass

class ShippingAddressSerializer(serializers.ModelSerializer):
    pass