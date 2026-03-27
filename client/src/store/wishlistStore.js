import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const useWishlistStore = create((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  toggle: async (destination) => {
    const { token } = useAuthStore.getState();
    if (!token) return false;
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/wishlist/toggle`, {
        destinationSlug: destination.slug,
        destinationName: destination.name,
        image: destination.image,
        price: destination.price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const currentItems = get().items;
      if (res.data.action === 'added') {
        set({ items: [res.data.item, ...currentItems] });
      } else {
        set({ items: currentItems.filter(item => item.destinationSlug !== destination.slug) });
      }
      return true;
    } catch (error) {
      console.error('Error toggling wishlist', error);
      return false;
    }
  },
  fetchWishlist: async () => {
    const { token } = useAuthStore.getState();
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/wishlist/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ items: res.data });
    } catch (error) {
      console.error('Error fetching wishlist', error);
    }
  }
}));

export default useWishlistStore;
