import React from 'react';
import './SizeGuide.css';

const SizeGuide = () => {
  return (
    <div className="size-guide-page">
      {/* Animated Background */}
      <div className="size-guide-background">
        <div className="animated-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>
        
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="floating-icons">
          <div className="icon-wrapper icon-1">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="currentColor"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" fill="currentColor"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-7">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-9">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-11">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="21" y1="10" x2="3" y2="10"/>
              <line x1="21" y1="6" x2="3" y2="6"/>
              <line x1="21" y1="14" x2="3" y2="14"/>
              <line x1="21" y1="18" x2="3" y2="18"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-12">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="7"/>
              <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <div className="size-guide-brand">
        <h1>Size Guide</h1>
        <p>Find Your Perfect Fit</p>
      </div>

      {/* Size Guide Card */}
      <div className="size-guide-card">
        {/* Men's Section */}
        <div className="size-section">
          <h2>Men's Sizing</h2>
          <div className="size-table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (inches)</th>
                  <th>Waist (inches)</th>
                  <th>Hips (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XS</td>
                  <td>32-34</td>
                  <td>26-28</td>
                  <td>33-35</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>35-37</td>
                  <td>29-31</td>
                  <td>36-38</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>38-40</td>
                  <td>32-34</td>
                  <td>39-41</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>41-43</td>
                  <td>35-37</td>
                  <td>42-44</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>44-46</td>
                  <td>38-40</td>
                  <td>45-47</td>
                </tr>
                <tr>
                  <td>XXL</td>
                  <td>47-49</td>
                  <td>41-43</td>
                  <td>48-50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Women's Section */}
        <div className="size-section">
          <h2>Women's Sizing</h2>
          <div className="size-table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust (inches)</th>
                  <th>Waist (inches)</th>
                  <th>Hips (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XS</td>
                  <td>31-32</td>
                  <td>24-25</td>
                  <td>34-35</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>33-34</td>
                  <td>26-27</td>
                  <td>36-37</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>35-36</td>
                  <td>28-29</td>
                  <td>38-39</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>37-39</td>
                  <td>30-32</td>
                  <td>40-42</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>40-42</td>
                  <td>33-35</td>
                  <td>43-45</td>
                </tr>
                <tr>
                  <td>XXL</td>
                  <td>43-45</td>
                  <td>36-38</td>
                  <td>46-48</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Kids Section */}
        <div className="size-section">
          <h2>Kids Sizing</h2>
          <div className="size-table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Age</th>
                  <th>Height (inches)</th>
                  <th>Weight (lbs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2T</td>
                  <td>2 years</td>
                  <td>33-35</td>
                  <td>26-28</td>
                </tr>
                <tr>
                  <td>3T</td>
                  <td>3 years</td>
                  <td>36-38</td>
                  <td>29-32</td>
                </tr>
                <tr>
                  <td>4T</td>
                  <td>4 years</td>
                  <td>39-41</td>
                  <td>33-36</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>5 years</td>
                  <td>42-44</td>
                  <td>37-42</td>
                </tr>
                <tr>
                  <td>6-7</td>
                  <td>6-7 years</td>
                  <td>45-48</td>
                  <td>43-50</td>
                </tr>
                <tr>
                  <td>8-10</td>
                  <td>8-10 years</td>
                  <td>49-54</td>
                  <td>51-70</td>
                </tr>
                <tr>
                  <td>12-13</td>
                  <td>11-13 years</td>
                  <td>55-60</td>
                  <td>71-95</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement Tips */}
        <div className="measurement-tips">
          <h2>How to Measure</h2>
          <div className="tips-grid">
            <div className="tip-item">
              <div className="tip-icon">📏</div>
              <h3>Chest/Bust</h3>
              <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
            </div>
            <div className="tip-item">
              <div className="tip-icon">📐</div>
              <h3>Waist</h3>
              <p>Measure around the narrowest part of your waist, about 1 inch above your belly button.</p>
            </div>
            <div className="tip-item">
              <div className="tip-icon">📏</div>
              <h3>Hips</h3>
              <p>Measure around the fullest part of your hips, keeping the tape parallel to the floor.</p>
            </div>
            <div className="tip-item">
              <div className="tip-icon">📐</div>
              <h3>Length</h3>
              <p>For tops, measure from the highest point of the shoulder to the hem.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
