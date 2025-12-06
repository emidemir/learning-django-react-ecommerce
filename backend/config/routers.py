from rest_framework import routers
from products.viewsets import CategoryViewset, ProductViewset, ReviewViewset
from orders.viewsets import CartViewset, CartItemViewset, OrderViewset, OrderItemViewset, ShippingAddressViewset

router = routers.DefaultRouter()

router.register(prefix='categories', viewset=CategoryViewset, basename='category')
router.register(prefix='products', viewset=ProductViewset, basename='product')
router.register(prefix='reviews', viewset=ReviewViewset, basename='review')
router.register(prefix='carts', viewset=CartViewset, basename='cart')
router.register(prefix='cartitems', viewset=CartItemViewset, basename='cartitem')
router.register(prefix='order', viewset=OrderViewset, basename='orders')
router.register(prefix='orderitems', viewset=OrderItemViewset, basename='orderitem')
router.register(prefix='shippingaddresses', viewset=ShippingAddressViewset, basename='shippingaddresse')


urlpatterns = router.urls