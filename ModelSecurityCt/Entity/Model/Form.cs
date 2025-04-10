﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model
{
    public class Form
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool IsDeleted { get; set; }

        public List<RolFormPermission> RolFormPermission { get; set; } = new List<RolFormPermission>();

       public List<FormModule> FormModules { get; set; }
    }
}
