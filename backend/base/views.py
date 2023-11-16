from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

from .models import Product
from .products import products
from .serailizers import ProductSerializer

@api_view(['GET'])
def getRoutes(request):
    return Response(products)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serailizer = ProductSerializer(products, many = True)
    return Response(serailizer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serailizer = ProductSerializer(product, many = False)
    return Response(serailizer.data)