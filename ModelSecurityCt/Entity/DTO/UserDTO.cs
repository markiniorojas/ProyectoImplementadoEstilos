﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int PersonId { get; set; }
        public string NamePerson { get; set; }
    }
}
