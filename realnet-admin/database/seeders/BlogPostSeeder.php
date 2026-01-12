<?php
// database/seeders/BlogPostSeeder.php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // ✅ Add this

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        // Create directory if it doesn't exist
        $directory = 'public/blog/images';
        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }

        // Create sample blog posts
        $posts = [
            [
                'title' => 'The Future of Web Development: Trends to Watch in 2024',
                'excerpt' => 'Explore the latest technologies and frameworks shaping the future of web development and how they can benefit your business.',
                'content' => '<p>Web development continues to evolve at a rapid pace. In 2024, we\'re seeing several key trends emerge that are changing how we build for the web.</p><p>From AI-powered development tools to the rise of Web3 technologies, developers need to stay ahead of the curve.</p>',
                'category' => 'web-development',
                'author' => 'Sarah Johnson',
                'read_time' => 8,
                'tags' => ['React', 'NextJS', 'Web3', 'AI'],
                'is_featured' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Building Scalable Mobile Applications: Best Practices',
                'excerpt' => 'Learn how to create mobile apps that can handle millions of users while maintaining performance and user experience.',
                'content' => '<p>Scalability is crucial for mobile applications that aim to serve large user bases.</p><p>In this article, we explore architectural patterns, database design, and performance optimization techniques.</p>',
                'category' => 'mobile-apps',
                'author' => 'Mike Chen',
                'read_time' => 6,
                'tags' => ['React Native', 'Flutter', 'Performance', 'Scalability'],
                'is_featured' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'SEO Strategies That Actually Work in 2024',
                'excerpt' => 'Updated SEO techniques and strategies to improve your website\'s search engine rankings.',
                'content' => '<p>Search engine optimization continues to be a critical component of digital marketing.</p><p>Learn about the latest algorithm updates and effective strategies for 2024.</p>',
                'category' => 'digital-marketing',
                'author' => 'Alex Rodriguez',
                'read_time' => 7,
                'tags' => ['SEO', 'Marketing', 'Content', 'Analytics'],
                'is_featured' => false,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'The Psychology of Color in UI/UX Design',
                'excerpt' => 'How color choices impact user behavior and conversion rates in digital products.',
                'content' => '<p>Color psychology plays a significant role in user experience design.</p><p>Discover how different colors affect user perception and behavior in digital interfaces.</p>',
                'category' => 'ui-ux-design',
                'author' => 'Emma Davis',
                'read_time' => 5,
                'tags' => ['UI Design', 'UX', 'Psychology', 'Color Theory'],
                'is_featured' => false,
                'published_at' => now()->subDays(8),
            ],
            [
                'title' => 'Why Your Business Needs a Progressive Web App',
                'excerpt' => 'Discover the benefits of PWAs and how they can transform your mobile presence.',
                'content' => '<p>Progressive Web Apps offer the best of both web and mobile applications.</p><p>Learn how PWAs can improve user engagement and reduce development costs.</p>',
                'category' => 'web-development',
                'author' => 'Lisa Wang',
                'read_time' => 4,
                'tags' => ['PWA', 'Mobile', 'Performance', 'Offline'],
                'is_featured' => false,
                'published_at' => now()->subDays(12),
            ],
        ];

        foreach ($posts as $postData) {
            $postData['slug'] = Str::slug($postData['title']); // ✅ Use imported Str
            BlogPost::create($postData);
        }

        // Create additional random posts if needed
        BlogPost::factory()->count(10)->create();
        
        $this->command->info('Blog posts seeded successfully!');
    }
}
