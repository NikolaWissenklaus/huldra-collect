console.log('%c [Huldra] Init - Inspetor de Rede GA4 ', 'background: #2c3e50; color: #1abc9c; padding: 3px 8px; border-radius: 4px; font-weight: bold; border-left: 3px solid #1abc9c;');

function processGA4Request(url, bodyData, method) {
    try {
        const parsedUrl = new URL(url.startsWith('http') ? url : window.location.origin + url);
        const urlParams = new URLSearchParams(parsedUrl.search);
        
        const tid = urlParams.get('tid') || 'Desconhecido';
        let events = [];

        if (bodyData && typeof bodyData === 'string') {
            const lines = bodyData.trim().split(/\r?\n/);
            lines.forEach(line => {
                const lineParams = new URLSearchParams(line);
                const eventObj = {};
                for (const [key, value] of urlParams.entries()) eventObj[key] = value;
                for (const [key, value] of lineParams.entries()) eventObj[key] = value;
                events.push(eventObj);
            });
        } else {
            const eventObj = {};
            for (const [key, value] of urlParams.entries()) eventObj[key] = value;
            events.push(eventObj);
        }

        events.forEach(evt => {
            const eventName = evt.en || 'page_view / config';
            const time = new Date().toLocaleTimeString();
            
            const styleTag = 'background: #111; color: #1abc9c; padding: 3px 6px; border-radius: 3px; font-weight: bold; border: 1px solid #1abc9c;';
            const styleMethod = 'color: #888; font-size: 10px; font-style: italic; margin-left: 5px;';
            
            console.groupCollapsed(`%c 📡 net_view: ${eventName} | ID: ${tid} %c [${time}] (${method})`, styleTag, styleMethod);
            
            const ids = [];
            const ups = [];
            const ens = [];
            const eps = [];
            const epns = [];
            const others = [];

            Object.keys(evt).forEach(key => {
                if (['uid', 'cid', 'sid'].includes(key)) ids.push(key);
                else if (key.startsWith('up.')) ups.push(key);
                else if (key === 'en') ens.push(key);
                else if (key.startsWith('epn.')) epns.push(key);
                else if (key.startsWith('ep.')) eps.push(key);
                else others.push(key);
            });

            // ordena internamente
            ids.sort((a, b) => {
                const order = {uid: 1, cid: 2, sid: 3};
                return order[a] - order[b];
            });
            ups.sort();
            eps.sort();
            epns.sort();
            others.sort();

            const styleIds = 'color: #3498db; font-weight: bold; font-size: 11px;';
            const styleUp = 'color: #9b59b6; font-weight: bold; font-size: 11px;';
            const styleEn = 'color: #2ecc71; font-weight: bold; font-size: 11px;';
            const styleEp = 'color: #e67e22; font-weight: bold; font-size: 11px;';
            const styleEpn = 'color: #00cec9; font-weight: bold; font-size: 11px;';
            const styleOther = 'color: #95a5a6; font-weight: bold; font-size: 11px;';
            const styleValue = 'color: #ecf0f1; font-size: 11px;';

            
            if (ids.length > 0 || ups.length > 0) {
                console.groupCollapsed('%c 👤 Identificação e Usuário', 'color: #3498db; font-weight: bold; font-size: 12px; margin-top: 4px;');
                ids.forEach(key => console.log(`%c▪ ${key}: %c${evt[key]}`, styleIds, styleValue));
                ups.forEach(key => console.log(`%c▪ ${key}: %c${evt[key]}`, styleUp, styleValue));
                console.groupEnd();
            }

            
            if (ens.length > 0 || eps.length > 0 || epns.length > 0) {
                console.groupCollapsed('%c 🎯 Dados do Evento', 'color: #2ecc71; font-weight: bold; font-size: 12px; margin-top: 4px;');
                ens.forEach(key => console.log(`%c▪ ${key}: %c${evt[key]}`, styleEn, styleValue));
                eps.forEach(key => console.log(`%c▪ ${key}: %c${evt[key]}`, styleEp, styleValue));
                epns.forEach(key => console.log(`%c▪ ${key}: %c${evt[key]}`, styleEpn, styleValue));
                console.groupEnd();
            }

            
            if (others.length > 0) {
                console.groupCollapsed('%c ⚙️ Outros Parâmetros', 'color: #7f8c8d; font-weight: bold; font-size: 12px; margin-top: 4px;');
                others.forEach(key => console.log(`%c▪ ${key}: %c${evt[key]}`, styleOther, styleValue));
                console.groupEnd();
            }

            console.groupEnd();
        });
    } catch (e) {
        console.error('[Huldra] Erro ao decodificar:', e);
    }
}

const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
    if (url && url.includes('/g/collect')) {
        const body = args[1]?.body;
        processGA4Request(url, body, 'Fetch');
    }
    return originalFetch.apply(this, args);
};

const originalBeacon = navigator.sendBeacon;
navigator.sendBeacon = function(url, data) {
    if (typeof url === 'string' && url.includes('/g/collect')) {
        processGA4Request(url, typeof data === 'string' ? data : null, 'Beacon');
    }
    return originalBeacon.apply(this, arguments);
};

console.log('%c [Huldra] Pronto! Monitorando Rede 📡 ', 'background: #1abc9c; color: #111; padding: 3px 8px; border-radius: 4px; font-weight: bold;');
