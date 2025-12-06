import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from faker import Faker

# Import your models
from users.models import Profile, Address
from products.models import Product, Category, Review
from orders.models import Order, OrderItem, ShippingAddress, Cart, CartItem

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = 'Seeds the database with dummy data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Clear existing data (Optional: comment out if you want to keep data)
        self.stdout.write('Deleting old data...')
        Order.objects.all().delete()
        Cart.objects.all().delete()
        Review.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete() # Keep your admin account

        # 2. Create Categories
        self.stdout.write('Creating Categories...')
        categories = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports']
        db_categories = []
        for cat in categories:
            c = Category.objects.create(name=cat, slug=slugify(cat))
            db_categories.append(c)

        # 3. Create Users, Profiles, and Addresses
        self.stdout.write('Creating Users...')
        users = []
        for _ in range(10): # Create 10 dummy users
            first_name = fake.first_name()
            last_name = fake.last_name()
            username = f"{first_name.lower()}{random.randint(1,999)}"
            email = f"{username}@example.com"
            
            user = User.objects.create_user(
                username=username,
                email=email,
                password='password123',
                first_name=first_name,
                last_name=last_name,
                is_verified=True
            )
            users.append(user)

            # Create Profile
            # Note: We rely on signals usually, but here we force create/update
            profile, created = Profile.objects.get_or_create(user=user)
            profile.gender = random.choice(['MALE', 'FEMALE', 'OTHER'])
            profile.phoneNumber = "+1212555" + str(random.randint(1000, 9999))
            profile.save()

            # Create Address
            Address.objects.update_or_create(
                profile=profile,
                defaults={
                    'country': 'US',
                    'city': fake.city(),
                    'district': fake.state(),
                    'street_address': fake.street_address(),
                    'postal_code': fake.zipcode(),
                    'primary': True,
                    'phone_number': profile.phoneNumber,
                    'building_number': random.randint(1, 99),
                    'apartment_number': random.randint(1, 50)
                }
            )

        # 4. Create Products
        self.stdout.write('Creating Products...')
        db_products = []
        for i in range(20): # Create 20 products
            cat = random.choice(db_categories)
            prod = Product.objects.create(
                user=users[0], # Assign first user as "seller"
                category=cat,
                name=f"{cat.name} Product {i+1}",
                brand=fake.company(),
                description=fake.paragraph(),
                rating=random.uniform(3.0, 5.0),
                numReviews=random.randint(0, 50),
                price=random.uniform(10.0, 500.0),
                countInStock=random.randint(0, 100)
                # image=None (We leave image blank for now)
            )
            db_products.append(prod)

        # 5. Create Reviews
        self.stdout.write('Creating Reviews...')
        for prod in db_products:
            # Add 1-5 reviews per product
            for _ in range(random.randint(1, 5)):
                Review.objects.create(
                    product=prod,
                    user=random.choice(users),
                    name=fake.name(),
                    rating=random.randint(3, 5),
                    comment=fake.sentence()
                )

        # 6. Create Orders (Past History)
        self.stdout.write('Creating Orders...')
        for user in users:
            # Create 1-3 orders per user
            for _ in range(random.randint(1, 3)):
                order_total = 0
                order = Order.objects.create(
                    user=user,
                    paymentMethod='PayPal',
                    taxPrice=10.00,
                    shippingPrice=5.00,
                    totalPrice=0.00, # Will update
                    isPaid=True,
                    isDelivered=random.choice([True, False]),
                    status='DELIVERED' if random.choice([True, False]) else 'PROCESSING'
                )

                # Add items to order
                for _ in range(random.randint(1, 4)):
                    prod = random.choice(db_products)
                    qty = random.randint(1, 3)
                    price = prod.price
                    OrderItem.objects.create(
                        product=prod,
                        order=order,
                        name=prod.name,
                        qty=qty,
                        price=price,
                        image=str(prod.image)
                    )
                    order_total += (price * qty)

                order.totalPrice = order_total + 15.00 # Add tax/shipping
                order.save()

                # Shipping Address for Order
                ShippingAddress.objects.create(
                    order=order,
                    address=fake.street_address(),
                    city=fake.city(),
                    postalCode=fake.zipcode(),
                    country='US',
                    shippingPrice=5.00
                )

        # 7. Create Carts
        self.stdout.write('Creating Carts...')
        for user in users:
            cart, _ = Cart.objects.get_or_create(user=user)
            # Add random items to cart
            prod = random.choice(db_products)
            CartItem.objects.create(
                cart=cart,
                product=prod,
                quantity=1
            )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))