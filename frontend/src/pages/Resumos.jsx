import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Resumos.css";
import axios from "axios";

const Resumos = () => {
    const[ucs, setUcs] = useState([]);
    const[search, setSearch] = useState("");
    const[filtered, setFiltered] = useState([]);
    const[showDropdown, setShowDropdown] = useState(false);
    const [resumos, setResumos] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:4000/api/lists/ucs")
            .then(res => {
                setUcs(res.data);
                console.log("UCs recebidas:", res.data);
            })
            .catch(err => {
        console.error("Erro ao buscar UCs:", err);
      });
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setFiltered([]);
            setShowDropdown(false);
        } else {
            const results = ucs.filter((uc) =>
                String(uc).toLowerCase().includes(search.toLowerCase())
            );
            setFiltered(results);
            setShowDropdown(true);
        }
    }, [search, ucs]);

    const handleSelect = (uc) => {
        setSearch(uc);
        setShowDropdown(false);
    }

    useEffect(() => {
        if (search.trim() === "") return;
        axios.get(`http://localhost:4000/api/files/search?uc=${encodeURIComponent(search)}`)
            .then(res => {
            setResumos(res.data.files);
            console.log("Resumos recebidos:", res.data.files);
        })
        .catch(err => {
            console.error("Erro ao buscar resumos:", err);
        });
    }, [search]);

    return(
        <div className="resumos-container">
            <h1>Fórum de Resumos</h1>
            <input
                type="text"
                placeholder="Pesquisa uma cadeira..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search && setShowDropdown(true)}
                className="resumos-search"
            />
            {showDropdown && filtered.length > 0 &&(
                <div className="resumos-dropdown">
                    {filtered.map((uc, index) => (
                        <div
                        key={index}
                        className="resumos-dropdown-items"
                        onClick={() => handleSelect(uc)}
                        >
                            {uc}
                        </div>
                    ))}
                </div>
            )}
            <div className="resumo-list">
                {resumos.map((resumo) => (
                    <ResumoCard key={resumo._id} resumo={resumo} />
                ))}
            </div>
        </div>
    );
};

export default Resumos;