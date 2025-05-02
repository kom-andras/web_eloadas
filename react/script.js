const { useState } = React;


function Szamlalo() {
  const [szam, setSzam] = useState(0);

  const novelSzamot = () => {
    setSzam(szam + 1);
  };

  const csokkentSzamot = () => {
    setSzam(szam - 1);
  };

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Számláló'),
    React.createElement('p', null, `A számláló értéke: ${szam}`),
    React.createElement('button', { onClick: novelSzamot }, 'Növel'),
    React.createElement('button', { onClick: csokkentSzamot }, 'Csökkent')
  );
}

ReactDOM.render(
  React.createElement(Szamlalo, null),
  document.getElementById('root')
);


function TeendoLista() {
  const [teendok, setTeendok] = useState([]);
  const [ujTeendo, setUjTeendo] = useState('');

  const teendoHozzaadasa = () => {
    if (ujTeendo.trim() !== '') {
      setTeendok([...teendok, ujTeendo]);
      setUjTeendo('');
    }
  };

  const teendoTorlese = (index) => {
    const ujTeendok = [...teendok];
    ujTeendok.splice(index, 1);
    setTeendok(ujTeendok);
  };

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Teendőlista'),
    React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'text',
        value: ujTeendo,
        onChange: (e) => setUjTeendo(e.target.value),
      }),
      React.createElement(
        'button',
        { onClick: teendoHozzaadasa },
        'Hozzáadás'
      )
    ),
    React.createElement(
      'ul',
      null,
      teendok.map((teendo, index) =>
        React.createElement(
          'li',
          { key: index },
          teendo,
          React.createElement(
            'button',
            { onClick: () => teendoTorlese(index) },
            'Törlés'
          )
        )
      )
    )
  );
}

function App() {
  const [aktivAlkalmazas, setAktivAlkalmazas] = useState('szamlalo');

  let aktivKomponens;
  if (aktivAlkalmazas === 'szamlalo') {
    aktivKomponens = React.createElement(Szamlalo, null);
  } else if (aktivAlkalmazas === 'teendolista') {
    aktivKomponens = React.createElement(TeendoLista, null);
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'nav',
      null,
      React.createElement(
        'button',
        { onClick: () => setAktivAlkalmazas('szamlalo') },
        'Számláló'
      ),
      React.createElement(
        'button',
        { onClick: () => setAktivAlkalmazas('teendolista') },
        'Teendőlista'
      )
    ),
    aktivKomponens
  );
}

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);