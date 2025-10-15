import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Cookie = {
  id: number;
  name: string;
  image: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skill: string;
  type: 'vanilla' | 'lily';
};

type Player = {
  name: string;
  score: number;
  wins: number;
};

const CookieRunGame = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [battleState, setBattleState] = useState<'idle' | 'attacking' | 'defending'>('idle');
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player');
  
  const [cookies] = useState<Cookie[]>([
    {
      id: 1,
      name: 'Pure Vanilla Cookie',
      image: '🍪',
      hp: 100,
      maxHp: 100,
      attack: 45,
      defense: 30,
      skill: 'Исцеляющий свет',
      type: 'vanilla'
    },
    {
      id: 2,
      name: 'White Lily Cookie',
      image: '🌸',
      hp: 100,
      maxHp: 100,
      attack: 52,
      defense: 25,
      skill: 'Цветочная буря',
      type: 'lily'
    }
  ]);

  const [playerCookie, setPlayerCookie] = useState<Cookie>(cookies[0]);
  const [enemyCookie, setEnemyCookie] = useState<Cookie>(cookies[1]);

  const [leaderboard] = useState<Player[]>([
    { name: 'Мастер Печенек', score: 9850, wins: 127 },
    { name: 'Сладкий Воин', score: 8720, wins: 103 },
    { name: 'Король Ванили', score: 7650, wins: 89 },
    { name: 'Лилия Света', score: 6890, wins: 76 },
    { name: 'Печенькин', score: 5430, wins: 62 }
  ]);

  const handleAttack = () => {
    if (currentTurn !== 'player') return;
    
    setBattleState('attacking');
    const damage = Math.max(5, playerCookie.attack - enemyCookie.defense / 2);
    
    setTimeout(() => {
      setEnemyCookie(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }));
      setBattleState('idle');
      setCurrentTurn('enemy');
      
      setTimeout(() => {
        enemyAttack();
      }, 1000);
    }, 800);
  };

  const enemyAttack = () => {
    setBattleState('defending');
    const damage = Math.max(5, enemyCookie.attack - playerCookie.defense / 2);
    
    setTimeout(() => {
      setPlayerCookie(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }));
      setBattleState('idle');
      setCurrentTurn('player');
    }, 800);
  };

  const handleSkill = () => {
    if (currentTurn !== 'player') return;
    
    setBattleState('attacking');
    const damage = playerCookie.attack * 1.5;
    
    setTimeout(() => {
      setEnemyCookie(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }));
      setBattleState('idle');
      setCurrentTurn('enemy');
      
      setTimeout(() => {
        enemyAttack();
      }, 1000);
    }, 1000);
  };

  const resetBattle = () => {
    setPlayerCookie(prev => ({ ...prev, hp: prev.maxHp }));
    setEnemyCookie(prev => ({ ...prev, hp: prev.maxHp }));
    setCurrentTurn('player');
    setBattleState('idle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="text-6xl md:text-7xl font-bold text-cookie-gold text-stroke mb-2">
            COOKIE RUN GAME
          </h1>
          <p className="text-xl text-cookie-brown font-semibold">✨ Печеньки победили! ✨</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white/80 p-2 rounded-3xl cookie-shadow">
            <TabsTrigger value="home" className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-cookie-gold data-[state=active]:to-yellow-400 data-[state=active]:text-white font-bold">
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="game" className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-cookie-pink data-[state=active]:to-pink-400 data-[state=active]:text-white font-bold">
              <Icon name="Swords" className="mr-2" size={18} />
              Игра
            </TabsTrigger>
            <TabsTrigger value="characters" className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-purple-600 data-[state=active]:text-white font-bold">
              <Icon name="Users" className="mr-2" size={18} />
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="rules" className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold">
              <Icon name="BookOpen" className="mr-2" size={18} />
              Правила
            </TabsTrigger>
            <TabsTrigger value="rating" className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-white font-bold">
              <Icon name="Trophy" className="mr-2" size={18} />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-teal-400 data-[state=active]:text-white font-bold">
              <Icon name="Info" className="mr-2" size={18} />
              О игре
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-bounce-in">
            <Card className="p-8 bg-white/90 backdrop-blur rounded-3xl cookie-shadow">
              <div className="text-center space-y-6">
                <div className="text-8xl animate-float">🍪✨</div>
                <h2 className="text-4xl font-bold text-cookie-brown">Добро пожаловать в Cookie Run!</h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                  Погрузись в захватывающий мир пошаговых сражений! Выбирай своего любимого персонажа и сражайся за победу!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-cookie-gold to-yellow-500 hover:from-yellow-500 hover:to-cookie-gold text-white font-bold text-xl px-8 py-6 rounded-full cookie-shadow-sm hover:scale-105 transition-transform"
                    onClick={() => setActiveTab('game')}
                  >
                    <Icon name="Play" className="mr-2" size={24} />
                    Начать играть
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-4 border-cookie-pink text-cookie-pink font-bold text-xl px-8 py-6 rounded-full hover:bg-cookie-pink hover:text-white transition-all"
                    onClick={() => setActiveTab('characters')}
                  >
                    <Icon name="Users" className="mr-2" size={24} />
                    Персонажи
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-2">⚔️</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Пошаговые бои</h3>
                    <p className="text-sm text-gray-600">Стратегические сражения с уникальными навыками</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Рейтинг лидеров</h3>
                    <p className="text-sm text-gray-600">Соревнуйся с другими игроками</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-2">🌟</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Уникальные герои</h3>
                    <p className="text-sm text-gray-600">Собери коллекцию легендарных печенек</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="game" className="animate-bounce-in">
            <Card className="p-6 bg-white/90 backdrop-blur rounded-3xl cookie-shadow">
              <h2 className="text-3xl font-bold text-center mb-6 text-cookie-brown">⚔️ Арена Сражений ⚔️</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-2xl ${battleState === 'attacking' ? 'animate-shake' : ''} ${currentTurn === 'player' ? 'ring-4 ring-cookie-gold' : ''}`}>
                  <div className="text-center mb-4">
                    <div className="text-7xl mb-2 animate-float">{playerCookie.image}</div>
                    <h3 className="text-2xl font-bold text-cookie-brown mb-2">{playerCookie.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">HP:</span>
                        <span className="font-bold text-red-600">{playerCookie.hp}/{playerCookie.maxHp}</span>
                      </div>
                      <Progress value={(playerCookie.hp / playerCookie.maxHp) * 100} className="h-3 bg-gray-200" />
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white/50 rounded-lg p-2">
                          <div className="font-semibold">⚔️ Атака</div>
                          <div className="font-bold text-orange-600">{playerCookie.attack}</div>
                        </div>
                        <div className="bg-white/50 rounded-lg p-2">
                          <div className="font-semibold">🛡️ Защита</div>
                          <div className="font-bold text-blue-600">{playerCookie.defense}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl ${battleState === 'defending' ? 'animate-shake' : ''} ${currentTurn === 'enemy' ? 'ring-4 ring-red-500' : ''}`}>
                  <div className="text-center mb-4">
                    <div className="text-7xl mb-2 animate-float">{enemyCookie.image}</div>
                    <h3 className="text-2xl font-bold text-cookie-brown mb-2">{enemyCookie.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">HP:</span>
                        <span className="font-bold text-red-600">{enemyCookie.hp}/{enemyCookie.maxHp}</span>
                      </div>
                      <Progress value={(enemyCookie.hp / enemyCookie.maxHp) * 100} className="h-3 bg-gray-200" />
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white/50 rounded-lg p-2">
                          <div className="font-semibold">⚔️ Атака</div>
                          <div className="font-bold text-orange-600">{enemyCookie.attack}</div>
                        </div>
                        <div className="bg-white/50 rounded-lg p-2">
                          <div className="font-semibold">🛡️ Защита</div>
                          <div className="font-bold text-blue-600">{enemyCookie.defense}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-full font-bold text-lg">
                  {currentTurn === 'player' ? '🎮 Ваш ход!' : '⏳ Ход противника...'}
                </div>
              </div>

              {playerCookie.hp > 0 && enemyCookie.hp > 0 ? (
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button 
                    size="lg"
                    onClick={handleAttack}
                    disabled={currentTurn !== 'player'}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white font-bold px-8 py-6 rounded-full cookie-shadow-sm disabled:opacity-50 hover:scale-105 transition-transform"
                  >
                    <Icon name="Sword" className="mr-2" size={20} />
                    Атака
                  </Button>
                  <Button 
                    size="lg"
                    onClick={handleSkill}
                    disabled={currentTurn !== 'player'}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-6 rounded-full cookie-shadow-sm disabled:opacity-50 hover:scale-105 transition-transform"
                  >
                    <Icon name="Sparkles" className="mr-2" size={20} />
                    Навык
                  </Button>
                  <Button 
                    size="lg"
                    onClick={resetBattle}
                    variant="outline"
                    className="border-4 border-gray-400 text-gray-700 font-bold px-8 py-6 rounded-full hover:bg-gray-100"
                  >
                    <Icon name="RotateCcw" className="mr-2" size={20} />
                    Сброс
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-5xl">
                    {playerCookie.hp > 0 ? '🎉' : '😢'}
                  </div>
                  <h3 className="text-3xl font-bold text-cookie-brown">
                    {playerCookie.hp > 0 ? 'Победа!' : 'Поражение!'}
                  </h3>
                  <Button 
                    size="lg"
                    onClick={resetBattle}
                    className="bg-gradient-to-r from-cookie-gold to-yellow-500 hover:from-yellow-500 hover:to-cookie-gold text-white font-bold px-8 py-6 rounded-full cookie-shadow-sm"
                  >
                    <Icon name="Play" className="mr-2" size={20} />
                    Играть снова
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="animate-bounce-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cookies.map((cookie) => (
                <Card key={cookie.id} className="p-6 bg-white/90 backdrop-blur rounded-3xl cookie-shadow hover:scale-105 transition-transform">
                  <div className="text-center space-y-4">
                    <div className="text-8xl animate-float">{cookie.image}</div>
                    <h3 className="text-3xl font-bold text-cookie-brown">{cookie.name}</h3>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">❤️ HP:</span>
                        <span className="font-bold text-xl text-red-600">{cookie.maxHp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">⚔️ Атака:</span>
                        <span className="font-bold text-xl text-orange-600">{cookie.attack}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">🛡️ Защита:</span>
                        <span className="font-bold text-xl text-blue-600">{cookie.defense}</span>
                      </div>
                      <div className="pt-2 border-t-2 border-purple-200">
                        <div className="font-semibold text-lg mb-1">✨ Навык:</div>
                        <div className="font-bold text-purple-600">{cookie.skill}</div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-cookie-gold to-yellow-500 hover:from-yellow-500 hover:to-cookie-gold text-white font-bold py-4 rounded-full cookie-shadow-sm"
                      onClick={() => {
                        setPlayerCookie(cookie);
                        setActiveTab('game');
                      }}
                    >
                      <Icon name="Play" className="mr-2" size={20} />
                      Выбрать персонажа
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rules" className="animate-bounce-in">
            <Card className="p-8 bg-white/90 backdrop-blur rounded-3xl cookie-shadow">
              <h2 className="text-3xl font-bold text-center mb-6 text-cookie-brown">📜 Правила игры</h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-cookie-brown mb-3 flex items-center">
                    <span className="text-3xl mr-3">1️⃣</span>
                    Выбор персонажа
                  </h3>
                  <p className="text-gray-700 ml-12">
                    Выберите своего любимого персонажа из доступных печенек. Каждый имеет уникальные характеристики и специальный навык!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-cookie-brown mb-3 flex items-center">
                    <span className="text-3xl mr-3">2️⃣</span>
                    Пошаговый бой
                  </h3>
                  <p className="text-gray-700 ml-12">
                    Бой проходит по очереди. В свой ход вы можете использовать обычную атаку или специальный навык персонажа.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-cookie-brown mb-3 flex items-center">
                    <span className="text-3xl mr-3">3️⃣</span>
                    Характеристики
                  </h3>
                  <p className="text-gray-700 ml-12">
                    <strong>HP</strong> - здоровье персонажа<br/>
                    <strong>Атака</strong> - урон, наносимый врагу<br/>
                    <strong>Защита</strong> - снижает получаемый урон
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-cookie-brown mb-3 flex items-center">
                    <span className="text-3xl mr-3">4️⃣</span>
                    Победа
                  </h3>
                  <p className="text-gray-700 ml-12">
                    Побеждает тот, кто первым снизит HP противника до нуля. Побеждайте в боях и поднимайтесь в рейтинге!
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rating" className="animate-bounce-in">
            <Card className="p-8 bg-white/90 backdrop-blur rounded-3xl cookie-shadow">
              <h2 className="text-3xl font-bold text-center mb-6 text-cookie-brown">🏆 Рейтинг лидеров</h2>
              <div className="space-y-3 max-w-2xl mx-auto">
                {leaderboard.map((player, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-2xl ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-200 to-yellow-300 cookie-shadow-sm' :
                      index === 1 ? 'bg-gradient-to-r from-gray-200 to-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-200 to-orange-300' :
                      'bg-gradient-to-r from-purple-100 to-pink-100'
                    }`}
                  >
                    <div className={`text-4xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-purple-600'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-cookie-brown">{player.name}</div>
                      <div className="text-sm text-gray-600">Побед: {player.wins}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-cookie-gold">{player.score}</div>
                      <div className="text-xs text-gray-500">очков</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="animate-bounce-in">
            <Card className="p-8 bg-white/90 backdrop-blur rounded-3xl cookie-shadow">
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="text-8xl animate-bounce">🍪</div>
                <h2 className="text-4xl font-bold text-cookie-brown">О игре Cookie Run</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Cookie Run - это захватывающая игра, где отважные печеньки сражаются за звание чемпиона! 
                  Погрузитесь в красочный мир пошаговых сражений, где каждый персонаж обладает уникальными способностями.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-3">🎮</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Простой геймплей</h3>
                    <p className="text-sm text-gray-600">Легко научиться, сложно мастерить. Идеально для игроков всех возрастов!</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-3">✨</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Яркая графика</h3>
                    <p className="text-sm text-gray-600">Красочный мультяшный стиль, который поднимает настроение!</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-3">⚔️</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Тактические бои</h3>
                    <p className="text-sm text-gray-600">Используйте стратегию, чтобы победить сильных противников!</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 p-6 rounded-2xl">
                    <div className="text-4xl mb-3">🌟</div>
                    <h3 className="font-bold text-lg text-cookie-brown mb-2">Коллекция героев</h3>
                    <p className="text-sm text-gray-600">Собирайте уникальных персонажей с особыми навыками!</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cookie-gold to-yellow-400 text-white p-6 rounded-2xl cookie-shadow mt-8">
                  <p className="text-2xl font-bold">
                    🎉 Печеньки победили! Присоединяйся к победителям! 🎉
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CookieRunGame;
