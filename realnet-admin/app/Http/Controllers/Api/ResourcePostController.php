<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResourcePost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ResourcePostController extends Controller
{
    /**
     * Display a list of published resource posts.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = ResourcePost::published()
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

            // Ensure all image URLs are absolute and process content images
            $posts->transform(function ($post) {
                if ($post->image && !str_starts_with($post->image, 'http')) {
                    $post->image = url($post->image);
                }
                $post->content = $this->processContentImages($post->content);
                return $post;
            });

            return response()->json([
                'success' => true,
                'posts' => $posts,
                'message' => 'Resource posts retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve resource posts: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve resource posts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display a specific resource post by slug.
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $post = ResourcePost::published()
                ->where('slug', $slug)
                ->firstOrFail();

            // Ensure image URL is absolute
            if ($post->image && !str_starts_with($post->image, 'http')) {
                $post->image = url($post->image);
            }
            
            $post->content = $this->processContentImages($post->content);

            return response()->json([
                'success' => true,
                'post' => $post,
                'message' => 'Resource post retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Resource post not found: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Resource post not found.',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Display featured resource posts.
     */
    public function featured(): JsonResponse
    {
        try {
            $featuredPosts = ResourcePost::published()
                ->featured()
                ->orderBy('published_at', 'desc')
                ->limit(3)
                ->get();

            // Ensure all image URLs are absolute
            $featuredPosts->transform(function ($post) {
                if ($post->image && !str_starts_with($post->image, 'http')) {
                    $post->image = url($post->image);
                }
                $post->content = $this->processContentImages($post->content);
                return $post;
            });

            return response()->json([
                'success' => true,
                'posts' => $featuredPosts,
                'message' => 'Featured resources retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve featured resources: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured resources.',
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
            $categories = ResourcePost::published()
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

    /**
     * Helper to ensure images in content are absolute URLs.
     */
    private function processContentImages(?string $content): ?string
    {
        if (!$content) {
            return $content;
        }

        // Replace relative paths starting with /storage/ with absolute URLs
        $baseUrl = config('app.url');
        
        // Remove trailing slash from base URL if present
        $baseUrl = rtrim($baseUrl, '/');

        // Regex to find src="/storage/..." and replace with absolute URL
        // We match src=" and then /storage/ to be specific
        $content = str_replace('src="/storage/', 'src="' . $baseUrl . '/storage/', $content);
        
        // Also handle cases where it might be encoded or single quotes
        $content = str_replace("src='/storage/", "src='" . $baseUrl . "/storage/", $content);
        
        return $content;
    }
}
