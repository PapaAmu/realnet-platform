<?php
// database/factories/BlogPostFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str; // ✅ Import Str

class BlogPostFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence(6);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title), // ✅ Use imported Str
            'excerpt' => $this->faker->paragraph(2),
            'content' => $this->faker->paragraphs(10, true),
            'image' => null, // No image for seeded data
            'category' => $this->faker->randomElement([
                'web-development',
                'mobile-apps',
                'digital-marketing',
                'ui-ux-design',
                'business-strategy',
                'technology'
            ]),
            'author' => $this->faker->name(),
            'read_time' => $this->faker->numberBetween(3, 15),
            'tags' => $this->faker->words(4),
            'is_featured' => $this->faker->boolean(20),
            'is_published' => true, // Make all published for testing
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
