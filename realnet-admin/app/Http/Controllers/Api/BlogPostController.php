<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class BlogPostController extends Controller
{
    /**
     * Display a list of published blog posts.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = BlogPost::published()
                ->orderBy('published_at', 'desc')
                ->orderBy('created_at', 'desc');

            // Filter by category if provided
            if ($request->filled('category') && $request->category !== 'all') {
                $query->where('category', $request->category);
            }

            // Search functionality
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%")
                        ->orWhereJsonContains('tags', $search);
                });
            }

            $posts = $query->get();

            // Ensure all image URLs are absolute
            $posts->transform(function ($post) {
                if ($post->image && !str_starts_with($post->image, 'http')) {
                    $post->image = url($post->image);
                }
                return $post;
            });

            return response()->json([
                'success' => true,
                'posts' => $posts,
                'message' => 'Blog posts retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve blog posts: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve blog posts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display a specific blog post by slug.
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $post = BlogPost::published()
                ->where('slug', $slug)
                ->firstOrFail();

            // Ensure image URL is absolute
            if ($post->image && !str_starts_with($post->image, 'http')) {
                $post->image = url($post->image);
            }

            return response()->json([
                'success' => true,
                'post' => $post,
                'message' => 'Blog post retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Blog post not found: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Blog post not found.',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Display featured blog posts.
     */
    public function featured(): JsonResponse
    {
        try {
            $featuredPosts = BlogPost::published()
                ->featured()
                ->orderBy('published_at', 'desc')
                ->limit(3)
                ->get();

            // Ensure all image URLs are absolute
            $featuredPosts->transform(function ($post) {
                if ($post->image && !str_starts_with($post->image, 'http')) {
                    $post->image = url($post->image);
                }
                return $post;
            });

            return response()->json([
                'success' => true,
                'posts' => $featuredPosts,
                'message' => 'Featured posts retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve featured posts: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured posts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Retrieve all unique categories from published posts.
     */
    public function categories(): JsonResponse
    {
        try {
            $categories = BlogPost::published()
                ->distinct()
                ->pluck('category')
                ->filter() // Remove null or empty
                ->values()
                ->toArray();

            return response()->json([
                'success' => true,
                'categories' => $categories,
                'message' => 'Categories retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve categories: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
