<?php

namespace Hawk\Stock\Repositories;

use Hawk\Stock\Contracts\ReservableStockeable;
use Hawk\Stock\Contracts\ReservableStockList;
use Hawk\Stock\Models\ReservableStock;
use Prettus\Repository\Eloquent\BaseRepository;

class ReservableStockManager extends BaseRepository
{

    protected $stockeable;

    public function model()
    {
        return ReservableStock::class;
    }

    public function getInstance()
    {
        if (! $this->stockeable) {
            throw new \Exception('No stockeable setted');
        }
        return $this->stockeable;
    }

    public function setStockeable(ReservableStockeable $stockeable)
    {
        $this->stockeable = $stockeable;
        return $this;
    }

    public function category(string $slug, $attributes)
    {
        $instance = $this->getInstance();
        $category = $instance->categories()->firstOrCreate(['slug', $slug]);
    }

    public function setStockList(string $slug, array $attributes)
    {
        $instance = $this->getInstance();

        $stockListInstance = $instance->setStockList(
            array_merge(['slug' => $slug], $attributes)
        );

        if ($categoriesInput = array_get($attributes, 'categories')) {
            foreach ($categoriesInput as $categoryInput) {
                if ($subcategoriesInput = array_get($categoryInput, 'categories')) {
                    $categorizer = array_get($categoryInput, 'categorizer');

                    $parent = $stockListInstance->addCategory([
                        'categorizer_type' => $categorizer->getResourceType(),
                        'categorizer_id' => $categorizer->getId(),
                        'parent_id' => array_get($attributes, 'parent_id'),
                    ]);

                    foreach ($subcategoriesInput as $subcategoryInput) {
                        $this->setReservableStockToCategory($stockListInstance, array_merge($subcategoryInput, [
                            'parent_id' => $parent->id,
                        ]));
                    }
                } else {
                    $this->setReservableStockToCategory($stockListInstance, $categoryInput);
                }
            }
        }
    }

    private function setReservableStockToCategory(ReservableStockList $stockListInstance, $attributes)
    {
        $categorizer = array_get($attributes, 'categorizer');
        $stock = array_get($attributes, 'stock');
        $allowsNegative = array_get($attributes, 'allowsNegative', false);

        $category = $stockListInstance
            ->addCategory([
                'categorizer_type' => $categorizer->getResourceType(),
                'categorizer_id' => $categorizer->getId(),
                'parent_id' => array_get($attributes, 'parent_id'),
            ]);

        $category->setStock([
            'stock' => $stock,
            'allowsNegative' => $allowsNegative,
        ]);
    }

}