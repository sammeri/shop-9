import fs from 'fs';
import path from 'path';

// ===== Типы и интерфейсы =====

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  rating: Rating;
  isFavorite: boolean;
  quantity: number;
  category: string;
  subcategory: string | null;
  characteristics: string[];
}

interface SubcategoryInfo {
  count: number;
}

interface CategoryInfo {
  count: number;
  subcategories: Record<string, SubcategoryInfo>;
}

interface CategoryNode {
  name: string;
  count: number;
  subcategories: CategoryNode[];
}

// type CategoryTree = Record<string, CategoryInfo>;

type GroupedFiles = Record<string, string[]>;

type ScannedCategories = Record<string, string[] | Record<string, string[]>>;

// ===== Конфиги =====

const baseDir = path.join(__dirname, '../../shop-9/public/images/products');
const productsFile = path.join(__dirname, 'products.json');
const categoriesFile = path.join(__dirname, 'categories.json');

const validExt = ['.webp', '.jpg', '.jpeg', '.png'];

// ===== Утилиты =====

function isImage(file: string): boolean {
  return validExt.includes(path.extname(file).toLowerCase());
}

// ===== Сканирование директорий =====

function scanCategories(dir: string): ScannedCategories {
  const categories = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const result: ScannedCategories = {};

  for (const cat of categories) {
    const categoryPath = path.join(dir, cat.name);
    const subEntries = fs.readdirSync(categoryPath, { withFileTypes: true });

    const subDirs = subEntries.filter((e) => e.isDirectory());
    const imageFiles = subEntries.filter((e) => e.isFile() && isImage(e.name));

    if (subDirs.length > 0) {
      const subObj: Record<string, string[]> = {};
      for (const sd of subDirs) {
        const subPath = path.join(categoryPath, sd.name);
        const files = fs.readdirSync(subPath).filter(isImage);
        if (files.length > 0) {
          subObj[sd.name] = files.map(
            (f) => `/public/images/products/${cat.name}/${sd.name}/${f}`,
          );
        }
      }
      result[cat.name] = subObj;
    } else if (imageFiles.length > 0) {
      result[cat.name] = imageFiles.map(
        (f) => `/public/images/products/${cat.name}/${f.name}`,
      );
    }
  }

  return result;
}

// ===== Группировка файлов по id =====

function groupFiles(files: string[]): GroupedFiles {
  const groups: GroupedFiles = {};

  files.forEach((file) => {
    const name = path.basename(file);
    const match = name.match(/^(\d+)/);
    if (!match) return;
    const id = match[1];
    if (!groups[id]) groups[id] = [];
    groups[id].push(file);
  });

  Object.keys(groups).forEach((id) => {
    groups[id].sort((a, b) => {
      const ext = path.extname(a);
      const mainFile = `${id}${ext}`;
      const nameA = path.basename(a);
      const nameB = path.basename(b);

      if (nameA === mainFile) return -1;
      if (nameB === mainFile) return 1;

      const extraA = nameA.match(new RegExp(`^${id}-(\\d+)\\.`));
      const extraB = nameB.match(new RegExp(`^${id}-(\\d+)\\.`));

      const numA = extraA ? parseInt(extraA[1], 10) : Infinity;
      const numB = extraB ? parseInt(extraB[1], 10) : Infinity;

      return numA - numB;
    });
  });

  return groups;
}

// ===== Построение списка продуктов =====

function buildProducts(scanned: ScannedCategories): Product[] {
  const products: Product[] = [];
  let nextProductId = 1;

  for (const [category, subData] of Object.entries(scanned)) {
    if (Array.isArray(subData)) {
      const groups = groupFiles(subData);
      for (const id of Object.keys(groups)) {
        products.push({
          id: nextProductId++,
          slug: `${category}-${id}`,
          title: `${category} ${id}`,
          description: `Описание ${category} ${id}`,
          price: parseFloat((Math.random() * 20 + 10).toFixed(2)),
          images: groups[id],
          stock: Math.floor(Math.random() * 200),
          rating: {
            rate: parseFloat((Math.random() * 5).toFixed(1)),
            count: Math.floor(Math.random() * 500),
          },
          isFavorite: false,
          quantity: 0,
          category,
          subcategory: null,
          characteristics: [
            'Материал: 100% хлопок',
            'Цвет: разный',
            'Размеры: S, M, L, XL',
          ],
        });
      }
    } else {
      for (const [subcat, files] of Object.entries(subData)) {
        const groups = groupFiles(files);
        for (const id of Object.keys(groups)) {
          products.push({
            id: nextProductId++,
            slug: `${subcat}-${id}`,
            title: `${subcat} ${id}`,
            description: `Описание ${subcat} ${id}`,
            price: parseFloat((Math.random() * 20 + 10).toFixed(2)),
            images: groups[id],
            stock: Math.floor(Math.random() * 200),
            rating: {
              rate: parseFloat((Math.random() * 5).toFixed(1)),
              count: Math.floor(Math.random() * 500),
            },
            isFavorite: false,
            quantity: 0,
            category,
            subcategory: subcat,
            characteristics: [
              'Материал: 100% хлопок',
              'Цвет: разный',
              'Размеры: S, M, L, XL',
            ],
          });
        }
      }
    }
  }

  return products;
}

// ===== Построение дерева категорий =====

function buildCategoriesTree(products: Product[]): CategoryNode[] {
  const treeMap: Record<string, CategoryInfo> = {};

  for (const product of products) {
    const { category, subcategory } = product;
    if (!treeMap[category]) {
      treeMap[category] = { count: 0, subcategories: {} };
    }
    treeMap[category].count++;

    if (subcategory) {
      if (!treeMap[category].subcategories[subcategory]) {
        treeMap[category].subcategories[subcategory] = { count: 0 };
      }
      treeMap[category].subcategories[subcategory].count++;
    }
  }

  // Преобразуем в массив
  const result: CategoryNode[] = Object.entries(treeMap).map(
    ([categoryName, categoryData]) => ({
      name: categoryName,
      count: categoryData.count,
      subcategories: Object.entries(categoryData.subcategories).map(
        ([subName, subData]) => ({
          name: subName,
          count: subData.count,
          subcategories: [],
        }),
      ),
    }),
  );

  return result;
}

// ===== Запуск =====

const scanned = scanCategories(baseDir);
const products = buildProducts(scanned);
const categoriesTree = buildCategoriesTree(products);

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), {
  encoding: 'utf-8',
});
fs.writeFileSync(categoriesFile, JSON.stringify(categoriesTree, null, 2), {
  encoding: 'utf-8',
});

console.log(`✔ products.json (товары): ${products.length}`);
console.log(`✔ categories.json (с подсчётом товаров)`);
