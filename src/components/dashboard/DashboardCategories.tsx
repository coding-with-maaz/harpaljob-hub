
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  PencilIcon, 
  Trash2Icon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  Plus,
  Search,
  LayoutGrid
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the category type
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  jobCount: number;
  isActive: boolean;
  createdAt: string;
}

// Mock data for the categories
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    description: "Jobs in the tech industry including software development, IT, and data science.",
    icon: "briefcase",
    jobCount: 42,
    isActive: true,
    createdAt: "2023-11-10T00:00:00.000Z"
  },
  {
    id: "2",
    name: "Marketing",
    slug: "marketing",
    description: "Marketing, advertising, and public relations positions.",
    icon: "trending-up",
    jobCount: 18,
    isActive: true,
    createdAt: "2023-11-05T00:00:00.000Z"
  },
  {
    id: "3",
    name: "Healthcare",
    slug: "healthcare",
    description: "Medical, nursing, and healthcare administration jobs.",
    icon: "heart",
    jobCount: 24,
    isActive: true,
    createdAt: "2023-10-28T00:00:00.000Z"
  },
  {
    id: "4",
    name: "Finance",
    slug: "finance",
    description: "Banking, accounting, and financial services roles.",
    icon: "dollar-sign",
    jobCount: 15,
    isActive: true,
    createdAt: "2023-10-20T00:00:00.000Z"
  },
  {
    id: "5",
    name: "Education",
    slug: "education",
    description: "Teaching, tutoring, and educational administration positions.",
    icon: "book",
    jobCount: 12,
    isActive: true,
    createdAt: "2023-10-15T00:00:00.000Z"
  }
];

// Form schema for category creation/editing
const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const DashboardCategories = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 5;

  // Filter categories based on search term
  const filteredCategories = mockCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Initialize form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "briefcase",
      isActive: true,
    },
  });

  // Reset form when dialog closes or when editing a different category
  useEffect(() => {
    if (isDialogOpen && editingCategory) {
      form.reset({
        name: editingCategory.name,
        description: editingCategory.description,
        icon: editingCategory.icon,
        isActive: editingCategory.isActive,
      });
    } else if (isDialogOpen && !editingCategory) {
      form.reset({
        name: "",
        description: "",
        icon: "briefcase",
        isActive: true,
      });
    }
  }, [isDialogOpen, editingCategory, form]);

  const onSubmit = (data: CategoryFormValues) => {
    if (editingCategory) {
      // Handle category update
      toast({
        title: "Category Updated",
        description: `Category "${data.name}" has been updated successfully.`,
      });
    } else {
      // Handle category creation
      toast({
        title: "Category Created",
        description: `Category "${data.name}" has been created successfully.`,
      });
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    // In a real app, you would call an API to delete the category
    toast({
      title: "Category Deleted",
      description: `Category has been deleted successfully.`,
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Job Categories</CardTitle>
        <CardDescription>Create, edit, and organize job categories</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                <DialogDescription>
                  {editingCategory
                    ? "Update the details of this job category"
                    : "Fill in the details to create a new job category"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Technology, Marketing, etc." {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed to job seekers when browsing categories.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief description of this job category"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Explain what type of jobs belong to this category.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Input placeholder="Icon name from Lucide icons" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter an icon name from Lucide icons library (e.g. briefcase, code, heart)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">
                      {editingCategory ? "Update Category" : "Create Category"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Job Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell>{category.jobCount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        category.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(category)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No categories found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        {filteredCategories.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCategories.length)} of{" "}
              {filteredCategories.length} categories
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCategories;
