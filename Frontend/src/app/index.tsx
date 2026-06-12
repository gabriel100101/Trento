import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatingDraggable, FloatingMotion, getMaxYForFloating } from '@/components/animation';

import { theme } from '@/constants/theme';

const colorOrder = [theme.colors.text, theme.colors.primaryDark, theme.colors.background] as const;
const CARD_WIDTH = 160;
const CARD_HEIGHT = 110;


const getBackgroundForTitleColor = (titleColor: string): string => {
  if (titleColor === theme.colors.text) {
    return theme.colors.textSecondary;
  }
  if (titleColor === theme.colors.primaryDark) {
    return theme.colors.primaryDark;
  }
  if (titleColor === theme.colors.background) {
    return theme.colors.surface;
  }
  return theme.colors.primary;
};

const windowDimensions = Dimensions.get('window');
const WINDOW_FALLBACK_HEIGHT = windowDimensions.height;
const WINDOW_FALLBACK_WIDTH = windowDimensions.width;

const speedConfig = {
  [theme.colors.text]: {
    floatDistance: 50,
    floatDuration: 2000,
    floatDelay: 1000,
  },
  [theme.colors.primaryDark]: {
    floatDistance: 100,
    floatDuration: 1000,
    floatDelay: 500,
  },
  [theme.colors.background]: {
    floatDistance: 200,
    floatDuration: 500,
    floatDelay: 0,
  },
};

type Card = {
  id: string;
  title: string;
  items: string[];
  x: number;
  y: number;
};

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isCreatingSubcard, setIsCreatingSubcard] = useState(false);
  const [newSubcardText, setNewSubcardText] = useState('');
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  const router = useRouter();
  const activeColor = colorOrder[activeIndex];
  const { floatDistance, floatDuration, floatDelay } = speedConfig[activeColor];

  const handleTitlePress = () => {
    setActiveIndex((current) => (current + 1) % colorOrder.length);
  };

  const handlePlusPress = () => {
    setIsCreating(true);
  };

  const handleCreatePress = () => {
    const title = newTitle.trim();
    if (!title) {
      return;
    }

    // LIMITES DOS CARDS - mesma lógica do “+”, mas aplicada à área de conteúdo
    // Como o View de cards fica APÓS o Header e ANTES do Footer, o height aqui já é “entre header e footer”.
    // Mesmo assim, descontamos FOOTER_HEIGHT/BottomTabInset pra garantir encostar no rodapé.
    const width = contentSize.width || WINDOW_FALLBACK_WIDTH;
    const height = contentSize.height || WINDOW_FALLBACK_HEIGHT;

    const maxX = Math.max(0, width - CARD_WIDTH);

    // O card deve ser limitado por: (altura do conteúdo - insetFooter - cardSize real)
    // Usamos uma estimativa de tamanho real do card (CARD_HEIGHT) para manter consistência com o clamp.
    // mesmo clamp do “+” (FloatingDraggable/FloatingMotion)
    const minY = 0;
    const maxY = getMaxYForFloating(height, CARD_HEIGHT);



    const x = Math.random() * maxX;
    const y = Math.random() * Math.max(0, maxY);


    setCards((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        title,
        items: [],
        x,
        y,
      },
    ]);
    setNewTitle('');
    setIsCreating(false);
  };

  const handleCardPress = (index: number) => {
    setSelectedCardIndex(index);
    setDetailModalVisible(true);
    setIsCreatingSubcard(false);
    setNewSubcardText('');
  };

  const handleDeleteCard = () => {
    if (selectedCardIndex === null) {
      return;
    }

    setCards((current) => current.filter((_, index) => index !== selectedCardIndex));
    setSelectedCardIndex(null);
    setDetailModalVisible(false);
    setIsCreatingSubcard(false);
    setNewSubcardText('');
  };

  const handleDeleteSubcard = (itemIndex: number) => {
    if (selectedCardIndex === null) {
      return;
    }

    setCards((current) =>
      current.map((card, index) =>
        index === selectedCardIndex
          ? { ...card, items: card.items.filter((_, subIndex) => subIndex !== itemIndex) }
          : card
      )
    );
  };

  const handleCreateSubcardPress = () => {
    const text = newSubcardText.trim();
    if (!text || selectedCardIndex === null) {
      return;
    }

    setCards((current) =>
      current.map((card, index) =>
        index === selectedCardIndex ? { ...card, items: [...card.items, text] } : card
      )
    );

    setNewSubcardText('');
    setIsCreatingSubcard(false);
  };

  const selectedCard = selectedCardIndex !== null ? cards[selectedCardIndex] : null;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trento" titleColor={activeColor} onTitlePress={handleTitlePress} />

      <View style={styles.content} onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setContentSize({ width, height });
      }}>
        {cards.map((card, index) => {
          const cardTextColor = activeColor === theme.colors.background ? theme.colors.text : theme.colors.background;
          const cardBackgroundColor = getBackgroundForTitleColor(activeColor);
          return (
            <FloatingMotion
                key={card.id}
                color={activeColor}
                floatDistance={floatDistance}
                floatDuration={floatDuration}
                floatDelay={floatDelay}
                initialX={card.x}
                initialY={card.y}
                minX={0} // Limite esquerdo: 0px
                maxX={(contentSize.width || WINDOW_FALLBACK_WIDTH) - CARD_WIDTH} // Limite direito
                minY={0} // Limite superior: 0px
                maxY={getMaxYForFloating(contentSize.height || WINDOW_FALLBACK_HEIGHT, CARD_HEIGHT)}


                style={[styles.cardWrapper, { left: card.x, top: card.y }]}
              >
                <Pressable
                  style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: theme.colors.border }]}
                  onPress={() => handleCardPress(index)}
                >
                  <Text style={[styles.cardTitle, { color: cardTextColor }]}>{card.title}</Text>
                  <View style={[styles.cardDivider, { backgroundColor: cardTextColor }]} />
                  <Text style={[styles.cardCount, { color: cardTextColor }]}>
                    {card.items.length} cards criados
                  </Text>
                </Pressable>
            </FloatingMotion>

          );
        })}
      </View>

      <FloatingDraggable
        color={activeColor}
        floatDistance={floatDistance}
        floatDuration={floatDuration}
        floatDelay={floatDelay}
        onPlusPress={handlePlusPress}
      />

      <Footer
        onQuadrosPress={() => router.push('/')}
        onCartoesPress={() => router.push('/cards')}
        onNotificacaoPress={() => router.push('/changes')}
        onContaPress={() => router.push('/account')}
      />

      <Modal visible={isCreating} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setIsCreating(false)} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quadro</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Pensa num título ai..."
              placeholderTextColor={theme.colors.border}
              style={styles.input}
            />
            <Pressable style={styles.createButton} onPress={handleCreatePress}>
              <Text style={styles.createButtonText}>Criar Quadro</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={detailModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setDetailModalVisible(false)} />
          <View style={styles.detailModalContent}>
            <Text style={styles.detailTitle}>{selectedCard?.title}</Text>
            <ScrollView style={styles.detailBody} contentContainerStyle={styles.detailBodyContent}>
              {selectedCard?.items.length ? (
                selectedCard.items.map((item, itemIndex) => (
                  <View key={`${item}-${itemIndex}`} style={styles.subcardRow}>
                    <View style={styles.subcard}>
                      <Text style={styles.subcardText}>{item}</Text>
                    </View>
                    <Pressable
                      style={styles.deleteSmallButton}
                      onPress={() => handleDeleteSubcard(itemIndex)}
                    >
                      <Text style={styles.deleteSmallButtonText}>X</Text>
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text style={styles.detailPlaceholder}>Nenhum card criado ainda.</Text>
              )}
            </ScrollView>

            <Pressable style={[styles.createButton, styles.deleteCardButton]} onPress={handleDeleteCard}>
              <Text style={styles.deleteButtonText}>Excluir quadro</Text>
            </Pressable>

            {isCreatingSubcard ? (
              <>
                <TextInput
                  value={newSubcardText}
                  onChangeText={setNewSubcardText}
                  placeholder="Escreva alguma coisa..."
                  placeholderTextColor={theme.colors.border}
                  style={styles.input}
                />
                <Pressable style={styles.createButton} onPress={handleCreateSubcardPress}>
                  <Text style={styles.createButtonText}>Criar card</Text>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.createButton} onPress={() => setIsCreatingSubcard(true)}>
                <Text style={styles.createButtonText}>Criar card</Text>
              </Pressable>
            )}

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardWrapper: {
    position: 'absolute',
    width: CARD_WIDTH,
  },
  card: {
    minHeight: 90,
    width: '100%',
    borderRadius: 14,
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDivider: {
    width: '120%',
    height: 2,
    backgroundColor: theme.colors.background,
    marginBottom: 10,
  },
  cardCount: {
    color: theme.colors.background,
    fontSize: 13,
    opacity: 0.9,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modalTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  detailModalContent: {
    width: '85%',
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    padding: 20,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  detailTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailBody: {
    maxHeight: 240,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingTop: 8,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.card,
  },
  detailBodyContent: {
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailPlaceholder: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  subcardRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  subcard: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcardText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  deleteSmallButton: {
    width: 38,
    height: 38,
    marginLeft: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteSmallButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  deleteCardButton: {
    backgroundColor: theme.colors.danger,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: theme.colors.text,
    marginBottom: 16,
    backgroundColor: theme.colors.card,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  createButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButtonText: {
    color: theme.colors.border,
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: theme.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
});
