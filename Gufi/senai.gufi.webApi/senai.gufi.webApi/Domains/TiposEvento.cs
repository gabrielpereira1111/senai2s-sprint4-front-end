using System;
using System.Collections.Generic;

#nullable disable

namespace senai.gufi.webApi.Domains
{
    public partial class TiposEvento
    {
        public TiposEvento()
        {
            Eventos = new HashSet<Evento>();
        }

        public int IdTipoEvento { get; set; }
        public string TituloTipoEvento { get; set; }

        public virtual ICollection<Evento> Eventos { get; set; }
    }
}
