import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto, Categoria } from '../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  productoForm: FormGroup;
  categorias = Object.values(Categoria);
  subcategoriasMascotas = ['perros', 'gatos', 'conejos', 'peces', 'iguanas', 'aves'];
  isEditMode = false;
  productoId?: number;
  isLoading = false;
  mostrarSubcategorias = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productoForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productoId = +params['id'];
        this.cargarProducto();
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      imagen: ['', [Validators.required, Validators.pattern('https?://.+')]],
      categoria: ['', Validators.required],
      subcategoria: [''], // Nueva campo para subcategoría
      stock: [0, [Validators.required, Validators.min(0)]],
      enOferta: [false],
      precioOferta: [0],
      // Campos específicos para mascotas
      raza: [''],
      edad: [''],
      sexo: [''],
      tamano: [''],
      vacunado: [false],
      esterilizado: [false]
    });
  }

  private cargarProducto(): void {
    if (this.productoId) {
      this.productoService.obtenerProductoPorId(this.productoId).subscribe(producto => {
        if (producto) {
          this.productoForm.patchValue(producto);
        } else {
          this.router.navigate(['/admin']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      this.isLoading = true;
      const productoData = this.productoForm.value;

      if (this.isEditMode && this.productoId) {
        this.productoService.actualizarProducto(this.productoId, productoData).subscribe({
          next: (producto) => {
            if (producto) {
              this.router.navigate(['/admin']);
            }
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      } else {
        this.productoService.crearProducto(productoData).subscribe({
          next: () => {
            this.router.navigate(['/admin']);
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productoForm.controls).forEach(key => {
      const control = this.productoForm.get(key);
      control?.markAsTouched();
    });
  }

  onCategoriaChange(): void {
    const categoria = this.productoForm.get('categoria')?.value;
    this.mostrarSubcategorias = categoria === Categoria.MASCOTAS;

    if (this.mostrarSubcategorias) {
      // Hacer subcategoría requerida para mascotas
      this.productoForm.get('subcategoria')?.setValidators([Validators.required]);
    } else {
      // Limpiar subcategoría para otras categorías
      this.productoForm.get('subcategoria')?.clearValidators();
      this.productoForm.get('subcategoria')?.setValue('');
    }
    this.productoForm.get('subcategoria')?.updateValueAndValidity();
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }

  getFieldError(field: string): string | null {
    const control = this.productoForm.get(field);
    if (control && control.errors && control.touched) {
      const errors = control.errors;

      if (errors['required']) return `${field} es requerido`;
      if (errors['minlength']) return `${field} debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
      if (errors['min']) return `${field} debe ser mayor a ${errors['min'].min}`;
      if (errors['pattern']) return `${field} debe ser una URL válida`;
    }
    return null;
  }
}
