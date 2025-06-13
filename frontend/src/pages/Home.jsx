

import React, { useEffect, useState } from 'react';
import '../assets/css/mapa.css'; // Reutilizar o CSS base

const Home = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    tipo: '',
  });
  const [token, setToken] = useState('');

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'teste@example.com',
            password: '123456',
          }),
        });

        const data = await response.json();
        console.log('Login response:', data);

        // Atualiza os dados do usuário
        setUserData({
          name: data.user.name,
          email: data.user.email,
          tipo: data.user.tipo,
        });

        // Atualiza o token
        setToken(data.token);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    };

    login();
  }, []);

  return (
    <div className="pagina-mapa"> {/* Mantém fundo e padding do layout principal */}
      <div className="mapa-wrapper" style={{ flexDirection: 'column', gap: '24px' }}>
        {/* Caixa de boas-vindas */}
        <div className="welcome-box">
          <h2>Bem-vindo ao ISCTE</h2>
          <p>
            Na página inicial podes ver as tuas próximas aulas, notificações, próximos eventos e ementas disponíveis.
          </p>
          <p>Vai até ao mapa e começa a explorar o campus!</p>
        </div>

        {/* Secção de horário */}
        <div className="horario">
          <div className="schedule-header">
            <h3>HORÁRIO</h3>
            <div className="see-all">
              <span>ver tudo</span>
              <span className="see-all-arrow">{'>'}</span>
            </div>
          </div>

          <div className="class-card">
            <div className="time">09:30</div>
            <div className="info">
              <strong>Programação para Internet</strong>
              <p className="room-change">Mudança de Sala: P1.02</p>
            </div>
            <div className="arrow">{'>'}</div>
          </div>

          <div className="class-card">
            <div className="time">14:00</div>
            <div className="info">
              <strong>Bases de Dados</strong>
              <p>Sala P3.03</p>
            </div>
            <div className="arrow">{'>'}</div>
          </div>

          <div className="class-card">
            <div className="time">10:00</div>
            <div className="info">
              <strong>Estratégia Empresarial</strong>
              <p>Sala E4.8</p>
            </div>
            <div className="arrow">{'>'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
