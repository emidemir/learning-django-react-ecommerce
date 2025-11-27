from rest_framework import serializers

from .models import Product, Review, Category

class CategorySerializer(serializers.ModelSerializer):
    pass

class ProductSerializer(serializers.ModelSerializer):
    pass

class ReviewSerializer(serializers.ModelSerializer):
    pass