        
        const domande = [
        { testo: "I robot industriali possono lavorare 24 ore su 24 senza pause.",              risposta: true  },
        { testo: "Un robot autonomo ha bisogno di un operatore umano per ogni singolo movimento.", risposta: false },
        { testo: "Il termine 'robot' fu coniato dallo scrittore Karel Čapek nel 1920.",          risposta: true  },
        { testo: "I sensori LiDAR vengono usati dai robot per rilevare ostacoli nello spazio.",  risposta: true  },
        { testo: "Intelligenza artificiale e robotica sono esattamente la stessa disciplina.",   risposta: false },
        { testo: "Un braccio robotico può avere più gradi di libertà.",                          risposta: true  },
        { testo: "I robot non possono essere impiegati in ambienti pericolosi per l'uomo.",      risposta: false },
        { testo: "ROS (Robot Operating System) è un framework ampiamente usato in robotica.",   risposta: true  },
        { testo: "Un robot mobile non è in grado di navigare in ambienti sconosciuti.",          risposta: false },
        { testo: "I robot vengono utilizzati anche in chirurgia medica di precisione.",          risposta: true  },
        { testo: "Un attuatore converte energia (es. elettrica) in movimento meccanico.",        risposta: true  },
        { testo: "Il robot ASIMO è stato sviluppato da Toyota.",                                 risposta: false },
        { testo: "I droni sono considerati una forma di robot volante.",                         risposta: true  },
        { testo: "I robot industriali non necessitano mai di alcuna manutenzione.",              risposta: false },
        { testo: "La cinematica inversa permette di calcolare i movimenti articolari di un robot.", risposta: true },
        ];

        /*  stati domanda: nulla | giusta | sbagliata */
        const stati = new Array(domande.length).fill(null);
        let domandaAttuale = -1;

        /*  riferimenti domande  */
        const grid          = document.getElementById('gridDomande');
        const modale        = document.getElementById('modale');
        const modaleNumero  = document.getElementById('modaleNumero');
        const modaleDomanda = document.getElementById('modaleDomanda');
        const modaleRis     = document.getElementById('modaleRisultato');
        const btnVero       = document.getElementById('btnVero');
        const btnFalso      = document.getElementById('btnFalso');

        /*  creazione pulsanti  ....... $ indica elementi nominati e già dichiarati per non confondersi*/
        domande.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'butt-domanda';
        btn.id        = `qbtn-${i}`;
        btn.textContent = `Q-${String(i + 1).padStart(2, '0')}`;
        btn.addEventListener('click', () => apriModale(i));
        grid.appendChild(btn);
        });

        /*  apri bottone  */
        function apriModale(i) {
        if (stati[i] === 'correct') return;   // già risposta bene: non riaprire
        domandaAttuale = i;
        modaleNumero.textContent  = `Q-${String(i + 1).padStart(2, '0')}`;
        modaleDomanda.textContent = domande[i].testo;
        modaleRis.textContent     = '';
        modaleRis.className       = 'risultato-testo';
        modale.style.display      = 'flex';
        }

        /*  contolla risposta  */
        function rispondi(scelta) {
        const corretta = domande[domandaAttuale].risposta;
        const btn      = document.getElementById(`qbtn-${domandaAttuale}`);

        if (scelta === corretta) {
        stati[domandaAttuale] = 'correct';
        btn.classList.remove('wrong');
        btn.classList.add('correct');
        btn.disabled = true;
        modaleRis.textContent = '✔ Corretto!';
        modaleRis.className   = 'risultato-testo testo-corretto';
        setTimeout(chiudiModale, 900);
        } else {
        stati[domandaAttuale] = 'wrong';
        btn.classList.remove('correct');
        btn.classList.add('wrong');
        modaleRis.textContent = '✘ Sbagliato! Riprova.';
        modaleRis.className   = 'risultato-testo testo-sbagliato';
        }
        }

        /*  chiusura bbottone  */
        function chiudiModale() {
        modale.style.display = 'none';
        domandaAttuale = -1;
        }

        /*  contollo eventi  */
        btnVero .addEventListener('click', () => rispondi(true));
        btnFalso.addEventListener('click', () => rispondi(false));
        document.getElementById('chiudiModale').addEventListener('click', chiudiModale);
        modale.addEventListener('click', e => { if (e.target === modale) chiudiModale(); });
