import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export type InfoSection = {
  title: string;
  text: string;
  icon: IconName;
  list?: string[];
  listTitle?: string;
};

export const infoSections: InfoSection[] = [
  {
    title: 'OM SPELET',
    text: 'Skräpjakten är ett spel för barn om återvinning. Här lär du dig varför vi sorterar och vad som händer med olika material.',
    icon: 'game-controller-outline',
  },
  {
    title: 'VARFÖR ÅTERVINNER VI?',
    text: 'När vi återvinner kan material användas igen i stället för att ta nya råvaror från naturen. Det sparar energi och gör att mindre skräp hamnar i naturen.',
    icon: 'leaf-outline',
    listTitle: 'BRA ATT VETA',
    list: [
      'Papper kan bli nya tidningar och kartonger',
      'Glas kan återvinnas många gånger utan att bli sämre',
    ],
  },
  {
    title: 'HUR SORTERAR MAN?',
    text: 'I Sverige sorterar vi olika material var för sig så att de kan återvinnas på rätt sätt.',
    icon: 'trash-outline',
    listTitle: 'EXEMPEL',
    list: [
      'Bananskal → matavfall (kan bli biogas eller jord)',
      'Plastflaska → plast (kan bli ny plast)',
      'Tidning → papper (kan bli nya pappersprodukter)',
      'Glasburk → glas (kan smältas om och användas igen)',
    ],
  },
  {
    title: 'HJÄLP DJUREN',
    text: 'Plast kan ligga kvar i naturen väldigt länge. Djur kan fastna i plast eller tro att det är mat, och då blir de sjuka.',
    icon: 'paw-outline',
    listTitle: 'VARFÖR DET SPELAR ROLL',
    list: [
      'Rent vatten och mark gör djur friskare',
      'Mindre skräp betyder tryggare hem för djuren',
    ],
  },
  {
    title: 'KONTAKT',
    text: 'Har du frågor eller idéer? Skriv till oss på kontakt@skrapjakten.se.',
    icon: 'mail-outline',
  },
  {
    title: 'VERSION',
    text: 'Version 1.0',
    icon: 'information-circle-outline',
  },
];
