// CDN-hosted image pointers for mock data.
import paris from "@/assets/dest-paris.webp.asset.json";
import amalfi from "@/assets/dest-amalfi.jpg.asset.json";
import portofino from "@/assets/dest-portofino.webp.asset.json";
import venice from "@/assets/dest-venice.webp.asset.json";
import italianAlps from "@/assets/dest-italian-alps.webp.asset.json";
import londonStreet from "@/assets/dest-london-street.jpg.asset.json";
import polignano from "@/assets/dest-polignano.jpg.asset.json";
import portofinoVilla from "@/assets/dest-portofino-villa.jpg.asset.json";
import heroLondon from "@/assets/hero-london.webp.asset.json";
import heroCoastalNight from "@/assets/hero-coastal-night.jpg.asset.json";
import safetyPassport from "@/assets/safety-passport.jpg";

// New semantic keys
const paris_ = paris.url;
const amalfi_ = amalfi.url;
const portofino_ = portofino.url;
const venice_ = venice.url;
const italianAlps_ = italianAlps.url;
const londonStreet_ = londonStreet.url;
const polignano_ = polignano.url;
const portofinoVilla_ = portofinoVilla.url;
const heroLondon_ = heroLondon.url;
const heroCoastalNight_ = heroCoastalNight.url;

export const IMG = {
  // New keys
  paris: paris_,
  amalfi: amalfi_,
  portofino: portofino_,
  venice: venice_,
  italianAlps: italianAlps_,
  londonStreet: londonStreet_,
  polignano: polignano_,
  portofinoVilla: portofinoVilla_,
  heroLondon: heroLondon_,
  heroCoastalNight: heroCoastalNight_,
  // Legacy keys — remapped to closest new photo so existing mock data keeps working
  chefchaouen: polignano_,
  kyoto: venice_,
  naxos: portofino_,
  srilanka: italianAlps_,
  himalayas: italianAlps_,
  bali: portofinoVilla_,
  iceland: amalfi_,
  heroWomen: paris_,
  heroStudents: londonStreet_,
  heroProfessionals: heroLondon_,
  heroSeniors: heroCoastalNight_,
  safetyPassport,
};
