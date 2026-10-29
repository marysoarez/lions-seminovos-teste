import type { Vehicle } from '../types'

const photosByModel: Record<string, string[]> = {
  'logan-life': ['https://img.olx.com.br/images/20/209521659554547.webp', 'https://images.usadosbr.com/manipulatedImages/media/gallery/a2/9f/2d/renault-logan-1-0-12v-sce-zen-1-2023-rio-de-janeiro-rj-9956d041-bg--4-image-760x570-crop.webp'],
  'gol-mpi': ['https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202601/20260102/volkswagen-gol-1.0-12v-mpi-totalflex-4p-manual-wmimagem10360097731.jpg', 'https://raposoautoshopping.com.br/admin/storage/uploads/1765215001_395970.jpg'],
  'onix-lt2': ['https://img.olx.com.br/images/86/866578560536602.jpg', 'https://giacomelliveiculos.com.br/carros/1572dcc1bb460436fb33ba3b77157af5-thumbjpeg-chevrolet-onix-13700241-1000-750-70.jpg'],
  'kwid-zen': ['https://www.chavesnamao.com.br/imn/0850x0450/A/60/veiculos/130653/8392067/renault-kwid-em-foz-do-iguacu-pr-e0d828a8.jpg', 'https://dsae.s3.amazonaws.com/00434116002697/Fotos/STJ-2D98_03.jpg?u=20260127172029'],
  '208-like': ['https://www.autocerto.com/fotos/3484/2583975/3.jpg?u=20250212150157', 'https://s3.ecompletocarros.dev/images/lojas/125/veiculos/226910/veiculoInfoVeiculoImagesMobile/vehicle_image_1738868614_d41d8cd98f00b204e9800998ecf8427e.jpeg'],
  'spin-ls': ['https://www.autocerto.com/fotos/7094/4725121/1.jpg'],
  'yaris-xl': ['https://img.olx.com.br/thumbs700x500/42/422645036509730.webp'],
  'c3-aircross': ['https://garagem360.com.br/wp-content/uploads/2024/09/citroen-c3-aircross-feel-pack-2025-4.jpg', 'https://img.olx.com.br/thumbs700x500/66/664672149323418.webp'],
  'onix-plus': ['https://catarina-prd.s3.sa-east-1.amazonaws.com/0deb52979e9c7108940ddb192ab7f29f.jpeg', 'https://next-files-bucket.s3.us-east-1.amazonaws.com/template/34/site/328/modules/sub_modules/720/new/a68835e49c5f953ef8991761681183.png'],
  't-cross-tsi': ['https://catarina-prd.s3.sa-east-1.amazonaws.com/f5a6f54e2d570a31dfc30a0417a61b7f.jpg', 'https://www.autossegredos.com.br/wp-content/uploads/2024/11/Novo-Volkswagen-T-Cross-Sense-200-TSI-2025-cor-Preto-Ninja-5.webp'],
  'cronos-drive': ['https://img2.icarros.com/dbimg/galeriaimgmodelo/0/148582_1.jpg', 'https://www.opovo.com.br/_midias/jpg/2025/04/23/cronos_drive_13at17__1_-34162693.jpg'],
  'bmw-g310gs': ['https://img.olx.com.br/images/38/383625720955137.jpg', 'https://static1.cafeland.vn/cafeauto/hinh-anh/2022/11/04/169/BMW-G310GS-2023-9.jpg'],
  'yamaha-fazer-fz25': ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'],
  'honda-cg160-titan': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85'],
  'royal-enfield-hunter-350': ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'],
  'honda-xre300': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85'],
  'yamaha-nmax-160': ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'],
  'honda-biz125': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85'],
  'yamaha-landert250': ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'],
  'kawasaki-z400': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85'],
  'royal-enfield-classic350': ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'],
  'honda-cbr500r': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85'],
  'suzuki-burgman125': ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'],
  'yamaha-factor150': ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85'],
}

const technicalDescriptions: Record<string, string> = {
  'logan-life': 'Sedã compacto equipado com motor 1.0 flex e transmissão manual. A versão Life prioriza espaço interno, porta-malas e uso cotidiano.',
  'gol-mpi': 'Hatch compacto com motorização 1.0 MPI flex e transmissão manual, configuração voltada à condução urbana e à eficiência.',
  'onix-lt2': 'Hatch compacto com motor 1.0 flex, transmissão manual e acabamento LT2. A configuração combina dimensões urbanas com quatro portas.',
  'kwid-zen': 'Hatch subcompacto com motor 1.0 flex e transmissão manual. A versão Zen tem proposta urbana e dimensões compactas.',
  '208-like': 'Hatch compacto versão Like MT, com motor 1.0 flex e transmissão manual. A carroceria oferece cinco portas e banco traseiro rebatível.',
  'spin-ls': 'Veículo familiar de carroceria monovolume, motor 1.8 flex e transmissão manual, com configuração voltada a espaço e versatilidade.',
  'yaris-xl': 'Sedã compacto com motor 1.5 flex e transmissão automática, na versão XL. Confirme a configuração exata de câmbio na ficha da unidade.',
  'c3-aircross': 'SUV compacto versão Feel Pack, com motor turbo flex e transmissão automática. O conjunto e a configuração de assentos devem ser confirmados para esta unidade.',
  'onix-plus': 'Sedã compacto com motor 1.0 turbo flex e transmissão automática, versão Premier 2. A configuração prioriza conforto e recursos de conveniência.',
  't-cross-tsi': 'SUV compacto com motor 1.0 TSI turbo flex e transmissão automática, em configuração TSI. Consulte a ficha da unidade para confirmar equipamentos.',
  'cronos-drive': 'Sedã compacto versão Drive, com motor 1.3 flex e transmissão automática, combinando porta-malas amplo e uso cotidiano.',
  'bmw-g310gs': 'Motocicleta trail/adventure com motor monocilíndrico de 313 cm³, refrigeração líquida, câmbio manual de seis marchas e ABS. Confirme a configuração e os equipamentos instalados na unidade.',
  'yamaha-fazer-fz25': 'Street/naked de 249 cm³ com motor monocilíndrico flex e câmbio manual de cinco marchas. Especificações podem variar conforme o ano-modelo; confira a ficha da unidade demonstrativa.',
  'honda-cg160-titan': 'Street urbana de 162,7 cm³, motor flex e câmbio manual de cinco marchas. A configuração serve como referência para anúncios de motos populares.',
  'royal-enfield-hunter-350': 'Custom/roadster de 349 cm³, motor monocilíndrico a gasolina e câmbio manual de cinco marchas. Consulte a configuração e os equipamentos da unidade demonstrativa.',
  'honda-xre300': 'Trail de 291,6 cm³, motor flex e câmbio manual de cinco marchas, voltada ao uso urbano e em vias irregulares. Especificações variam conforme a versão.',
  'yamaha-nmax-160': 'Scooter de 155 cm³, motor a gasolina e transmissão automática CVT. Os recursos e itens de série dependem do ano e versão.',
  'honda-biz125': 'CUB urbana de 123,9 cm³, motor flex e câmbio semiautomático de quatro marchas. Exemplo fictício para demonstrar uma categoria popular de baixa cilindrada.',
  'yamaha-landert250': 'Trail de 250 cm³, motor flex e câmbio manual de cinco marchas. A proposta combina uso urbano e estradas não pavimentadas.',
  'kawasaki-z400': 'Naked de 399 cm³ com motor bicilíndrico a gasolina e câmbio manual de seis marchas. Dados de versão e equipamentos são ilustrativos.',
  'royal-enfield-classic350': 'Roadster clássica de 349 cm³, motor monocilíndrico a gasolina e câmbio manual de cinco marchas. Exemplo para demonstrar motos de estilo clássico.',
  'honda-cbr500r': 'Esportiva de 471 cm³, motor bicilíndrico a gasolina e câmbio manual de seis marchas. A configuração de freios e assistências depende da versão.',
  'suzuki-burgman125': 'Scooter urbana de 124 cm³, motor a gasolina e transmissão automática CVT. Itens de conforto e capacidade variam conforme o ano-modelo.',
  'yamaha-factor150': 'Street urbana de 149 cm³, motor flex e câmbio manual de cinco marchas, pensada para deslocamentos cotidianos.',
}

function createVehicle(vehicle: Omit<Vehicle, 'images' | 'description' | 'technicalDescription' | 'vehicleType' | 'fuel' | 'additionalParts'> & { additionalParts?: string[] }): Vehicle {
  const images = photosByModel[vehicle.id] ?? [vehicle.image]
  const isMoto = vehicle.category === 'Moto'
  return {
    ...vehicle,
    image: images[0],
    images,
    vehicleType: isMoto ? 'Moto' : 'Carro',
    fuel: isMoto ? 'Gasolina' : 'Flex',
    motorcycleCategory: isMoto ? vehicle.motorcycleCategory as Vehicle['motorcycleCategory'] : undefined,
    displacementCc: isMoto ? vehicle.displacementCc : undefined,
    additionalParts: isMoto ? vehicle.additionalParts ?? [] : [],
    demoOnly: vehicle.demoOnly,
    description: vehicle.demoOnly ? 'Veículo fictício para demonstrar como os futuros anúncios de motos podem aparecer no catálogo. Imagem ilustrativa, preço e quilometragem são dados de exemplo; não representa disponibilidade real.' : 'Anúncio consultado no catálogo da Lions Seminovos. As fotos são imagens públicas de referência do modelo, não as fotos deste anúncio. Confirme disponibilidade, preço e condições diretamente com a loja.',
    technicalDescription: technicalDescriptions[vehicle.id],
  }
}

const listings: Array<Omit<Vehicle, 'images' | 'description' | 'technicalDescription' | 'vehicleType' | 'fuel' | 'additionalParts'> & { additionalParts?: string[] }> = [
  { id: 'logan-life', brand: 'Renault', model: 'Logan Life 1.0 MT', year: 2023, mileage: 95163, price: 48390, category: 'Sedan', color: 'Branca', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85', featured: true },
  { id: 'gol-mpi', brand: 'Volkswagen', model: 'Gol MPI', year: 2023, mileage: 31750, price: 46990, category: 'Hatch', color: 'Branca', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85', featured: true },
  { id: 'onix-lt2', brand: 'Chevrolet', model: 'Onix 1.0 MT LT2', year: 2024, mileage: 50195, price: 60590, category: 'Hatch', color: 'Azul', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85', featured: true },
  { id: 'kwid-zen', brand: 'Renault', model: 'Kwid Zen 2', year: 2025, mileage: 39838, price: 48390, category: 'Hatch', color: 'Prata', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: '208-like', brand: 'Peugeot', model: '208 Like MT', year: 2024, mileage: 96386, price: 57890, category: 'Hatch', color: 'Preta', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 'spin-ls', brand: 'Chevrolet', model: 'Spin 1.8 MT LS', year: 2024, mileage: 29414, price: 69290, category: 'Minivan', color: 'Branca', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 'yaris-xl', brand: 'Toyota', model: 'Yaris XL 1.5', year: 2025, mileage: 39870, price: 82490, category: 'Sedan', color: 'Cinza', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 'c3-aircross', brand: 'Citroën', model: 'C3 Aircross Feel Pack', year: 2025, mileage: 43497, price: 84490, category: 'SUV', color: 'Cinza', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 'onix-plus', brand: 'Chevrolet', model: 'Onix Plus 1.0 Turbo AT', year: 2025, mileage: 41462, price: 90090, category: 'Sedan', color: 'Preta', image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 't-cross-tsi', brand: 'Volkswagen', model: 'T-Cross TSI', year: 2025, mileage: 49581, price: 107290, category: 'SUV', color: 'Preta', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 'cronos-drive', brand: 'Fiat', model: 'Cronos Drive 1.3 AT', year: 2026, mileage: 32570, price: 83900, category: 'Sedan', color: 'Branca', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85', featured: false },
  { id: 'bmw-g310gs', brand: 'BMW', model: 'G 310 GS', year: 2023, mileage: 4595, price: 27390, category: 'Moto', motorcycleCategory: 'Trail', displacementCc: 313, additionalParts: [], color: 'Preta', image: 'https://img.olx.com.br/images/38/383625720955137.jpg', featured: false },
  { id: 'yamaha-fazer-fz25', brand: 'Yamaha', model: 'Fazer FZ25 ABS', year: 2023, mileage: 12800, price: 21900, category: 'Moto', motorcycleCategory: 'Naked', displacementCc: 249, additionalParts: ['Protetor de motor', 'Slider'], color: 'Azul', image: '', featured: false, demoOnly: true },
  { id: 'honda-cg160-titan', brand: 'Honda', model: 'CG 160 Titan', year: 2024, mileage: 8200, price: 18900, category: 'Moto', motorcycleCategory: 'Street', displacementCc: 163, additionalParts: ['Baú traseiro'], color: 'Vermelha', image: '', featured: false, demoOnly: true },
  { id: 'royal-enfield-hunter-350', brand: 'Royal Enfield', model: 'Hunter 350', year: 2024, mileage: 5400, price: 22900, category: 'Moto', motorcycleCategory: 'Custom', displacementCc: 349, additionalParts: ['Protetor de motor', 'Bagageiro'], color: 'Preta', image: '', featured: false, demoOnly: true },
  { id: 'honda-xre300', brand: 'Honda', model: 'XRE 300 ABS', year: 2022, mileage: 18700, price: 24900, category: 'Moto', motorcycleCategory: 'Trail', displacementCc: 292, additionalParts: ['Protetor de cárter', 'Bauleto'], color: 'Cinza', image: '', featured: false, demoOnly: true },
  { id: 'yamaha-nmax-160', brand: 'Yamaha', model: 'NMAX 160 ABS', year: 2024, mileage: 6100, price: 20900, category: 'Moto', motorcycleCategory: 'Scooter', displacementCc: 155, additionalParts: [], color: 'Branca', image: '', featured: false, demoOnly: true },
  { id: 'honda-biz125', brand: 'Honda', model: 'Biz 125', year: 2023, mileage: 7600, price: 14500, category: 'Moto', motorcycleCategory: 'Street', displacementCc: 124, additionalParts: ['Baú traseiro'], color: 'Vermelha', image: '', featured: false, demoOnly: true },
  { id: 'yamaha-landert250', brand: 'Yamaha', model: 'Lander 250 ABS', year: 2023, mileage: 11400, price: 23900, category: 'Moto', motorcycleCategory: 'Trail', displacementCc: 250, additionalParts: ['Protetor de motor', 'Protetor de mão'], color: 'Azul', image: '', featured: false, demoOnly: true },
  { id: 'kawasaki-z400', brand: 'Kawasaki', model: 'Z400 ABS', year: 2022, mileage: 9700, price: 28900, category: 'Moto', motorcycleCategory: 'Naked', displacementCc: 399, additionalParts: ['Slider'], color: 'Verde', image: '', featured: false, demoOnly: true },
  { id: 'royal-enfield-classic350', brand: 'Royal Enfield', model: 'Classic 350', year: 2023, mileage: 6800, price: 21900, category: 'Moto', motorcycleCategory: 'Custom', displacementCc: 349, additionalParts: ['Alforjes laterais'], color: 'Verde', image: '', featured: false, demoOnly: true },
  { id: 'honda-cbr500r', brand: 'Honda', model: 'CBR 500R', year: 2022, mileage: 12300, price: 35900, category: 'Moto', motorcycleCategory: 'Esportiva', displacementCc: 471, additionalParts: ['Bolha esportiva'], color: 'Vermelha', image: '', featured: false, demoOnly: true },
  { id: 'suzuki-burgman125', brand: 'Suzuki', model: 'Burgman 125', year: 2023, mileage: 8900, price: 13900, category: 'Moto', motorcycleCategory: 'Scooter', displacementCc: 124, additionalParts: [], color: 'Cinza', image: '', featured: false, demoOnly: true },
  { id: 'yamaha-factor150', brand: 'Yamaha', model: 'Factor 150', year: 2024, mileage: 5900, price: 15900, category: 'Moto', motorcycleCategory: 'Street', displacementCc: 149, additionalParts: ['Bauleto'], color: 'Preta', image: '', featured: false, demoOnly: true },
]

export const vehicles: Vehicle[] = listings.map(createVehicle)

