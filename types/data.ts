interface CategoryType {
  id: number;
  nama_kategori: string;
}
interface ProductType {
  id: number;
  nama_produk: string;
  gambar_utama: string;
  id_kategori: number;
  kategori: CategoryType;
  deskripsi: string;
  jumlah: number;
  harga: number;
}

interface ImageType {
  id: number;
  id_produk: number;
  url: string;
}
interface RoleType {
  id: number;
  nama_role: string;
}

interface UserType {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  no_telp: number;
  role: RoleType;
}

export type { ProductType, CategoryType, ImageType, RoleType, UserType };
