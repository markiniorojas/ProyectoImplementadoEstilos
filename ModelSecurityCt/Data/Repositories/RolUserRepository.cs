﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Core;
using Data.Interfaces;
using Entity.context;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Data.Repositories
{
    public class RolUserRepository : GenericRepository<RolUser>, IRolUserRepository
    {
        public RolUserRepository(ApplicationDbContext context, ILogger<RolUserRepository> logger)
        : base(context, logger) { }
        public async Task<IEnumerable<RolUser>> GetAllAsync()
        {

            return await _context.RolUser
           .Include(fm => fm.Rol)
           .Include(fm => fm.User)
           .Where(fm => fm.IsDeleted)
           .ToListAsync();
        }

        public async Task<RolUser?> GetByIdAsync(int id)
        {
            return await _context.Set<RolUser>()
        .Include(fm => fm.Rol)
        .Include(fm => fm.User)
        .FirstOrDefaultAsync(fm => fm.Id == id);


        }
    }
}
