import type { GalleryItem } from "../types";
import { IMG } from "./images";

export const gallery: GalleryItem[] = [
  { id: "g1", kind: "image", src: IMG.naxos, caption: "Naxos, Greece", location: "Aegean" },
  { id: "g2", kind: "image", src: IMG.chefchaouen, caption: "Chefchaouen, Morocco" },
  { id: "g3", kind: "image", src: IMG.kyoto, caption: "Kyoto, Japan" },
  { id: "g4", kind: "image", src: IMG.srilanka, caption: "Sri Lankan Highlands" },
  { id: "g5", kind: "image", src: IMG.himalayas, caption: "Indian Himalayas" },
  { id: "g6", kind: "image", src: IMG.bali, caption: "Bali, Indonesia" },
  { id: "g7", kind: "image", src: IMG.iceland, caption: "Iceland" },
  { id: "g8", kind: "image", src: IMG.heroWomen, caption: "Solo women travelers" },
  { id: "g9", kind: "image", src: IMG.heroSeniors, caption: "Senior tours" },
  { id: "g10", kind: "image", src: IMG.heroStudents, caption: "Student expeditions" },
  { id: "g11", kind: "image", src: IMG.heroProfessionals, caption: "Weekend escapes" },
  { id: "g12", kind: "image", src: IMG.safetyPassport, caption: "The essentials" },
];
